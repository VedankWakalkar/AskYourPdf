import express from "express";
import cors from 'cors'
import multer from "multer";
import { Queue } from 'bullmq';
import { PORT, REDIS_HOST } from "./config/env.js";
import { BULLMQ_PORT } from "./config/env.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from '@langchain/qdrant';
import { GOOGLE_API_KEY } from "./config/env.js";
import { QDRANT_URL } from "./config/env.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import connectToDatabase from "./database/mongoose.js";
import uploadMiddleware from "./middleware/uploadPdf.middleware.js";
import UploadPDF from "./models/user.upload.js";

const genAI=new GoogleGenerativeAI(GOOGLE_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const app = express();
app.use(cors())
app.use(express.json())

const queue=new Queue('file-upload',{connection:{
    host:REDIS_HOST,
    port:BULLMQ_PORT
}})

const MAX_REQUESTS_PER_USER= 10;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  return res.json({ status: 'All Good!' });
});

app.get('/pdf/limit',async(req,res)=>{
  const userId=req.headers["x-user-id"];
  if(!userId){
    return res.status(403).json({
      success:false,
      message:"FORBIDDEN"
    })
  }
  try {
    let isUserExist=await UploadPDF.findOne({userId});
    if(!isUserExist){
      isUserExist=await UploadPDF.create({
        userId,
        filenames:[]
      })
    }
    const pdfCount = isUserExist.fileNames.length;
      return res.status(200).json({
        success:true,
        count : pdfCount
      })
  } catch (error) {
    console.log("Some Error occured : ",error)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
})

app.post('/upload/pdf',upload.single('pdf'), uploadMiddleware,  async (req, res) => {
  const userId = req.headers["x-user-id"]; 
  if(!userId){
    return res.status(403).json({
      success:false,
      message:"Forbidden"
    })
  }
  await queue.add(
    'file-ready',
    {
      filename: req.file.originalname,
      destination: req.file.destination,
      path: req.file.path,
      userId:userId
    }
  );
  console.log("file uploaded")
  console.log("userId : ",userId)
  return res.json({ message: 'uploaded' });
});

app.get('/chat', async (req, res) => {
  const userId= req.headers["x-user-id"];
  console.log("userid : ",userId)
  const userQuery = req.query.message;
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: GOOGLE_API_KEY,
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: QDRANT_URL,
      collectionName: `user-${userId}`,
    }
  );

  const retriever = vectorStore.asRetriever({ k: 2 });
  const result = await retriever.invoke(userQuery);

  // Embed context directly into user's query
  const CONTEXT_PROMPT = `
You are an AI assistant. Use the following context from a PDF to answer the user's question.

Context:
${JSON.stringify(result, null, 2)}

Question: ${userQuery}
`;

  const chat = model.startChat(); // no initial history required

  const chatResult = await chat.sendMessage(CONTEXT_PROMPT);
  const response = await chatResult.response;
  const message = response.text();

  return res.json({
    message,
    docs: result,
  });
});

app.listen(PORT,async ()=>{
    console.log(`Server running on port ${PORT}`),
    await connectToDatabase()
})
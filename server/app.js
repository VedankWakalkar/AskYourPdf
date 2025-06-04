import express from "express";
import cors from 'cors'
import multer from "multer";
import { Queue } from 'bullmq';
import { HOST } from "./config/env.js";
import { BULLMQ_PORT } from "./config/env.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from '@langchain/qdrant';
import { GOOGLE_API_KEY } from "./config/env.js";
import { QDRANT_URL } from "./config/env.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI=new GoogleGenerativeAI(GOOGLE_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const app = express();
app.use(cors())
app.use(express.json())

const queue=new Queue('file-upload',{connection:{
    host:HOST,
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

app.post('/upload/pdf', upload.single('pdf'), async (req, res) => {

  await queue.add(
    'file-ready',
    {
      filename: req.file.originalname,
      destination: req.file.destination,
      path: req.file.path
    }
  );
  console.log("file uploaded")
  return res.json({ message: 'uploaded' });
});

app.get('/chat', async (req, res) => {
  const userQuery = req.query.message;
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: GOOGLE_API_KEY,
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: QDRANT_URL,
      collectionName: `langchainjs-testing`,
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

app.listen(8080,()=>{
    console.log("Server is Running")
})
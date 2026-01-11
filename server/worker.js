// import { Worker } from 'bullmq';
// import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
// import { QdrantVectorStore } from '@langchain/qdrant';
// import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
// import { BULLMQ_PORT, GOOGLE_API_KEY, HOST, QDRANT_URL } from './config/env.js';

// const worker = new Worker(
//   'file-upload',
//   async (job) => {
//     try {
//       console.log(`Job:`, job.data);
//       const data = job.data;
//       const userId=job.data.userId;
//       console.log(
//         "UserID: ",userId
//       )
//       // Load PDF file
//       const loader = new PDFLoader(data.path);
//       const docs = await loader.load();
//       console.log("✅ PDF loaded!");

//       // Initialize Gemini embeddings
//       const embeddings = new GoogleGenerativeAIEmbeddings({
//         apiKey: GOOGLE_API_KEY,
//       });
//       console.log("✅ Gemini Embeddings initialized!");

//       // Connect to Qdrant and add documents
//       const vectorStore = await QdrantVectorStore.fromExistingCollection(
//         embeddings,
//         {
//           url: QDRANT_URL,
//           collectionName: `user-${userId}`,
//         }
//       );

//       await vectorStore.addDocuments(docs);
//       console.log(`✅ All docs added to vector store`);
//     } catch (err) {
//       console.error("❌ Worker failed with error:", err);
//     }
//   },
//   {
//     concurrency: 100,
//     connection: {
//       host: HOST,
//       port: BULLMQ_PORT,
//     },
//   }
// );

import { Worker } from 'bullmq';
import OpenAI from "openai";
import { QdrantVectorStore } from '@langchain/qdrant';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { BULLMQ_PORT, GOOGLE_API_KEY, HOST, QDRANT_URL } from './config/env.js';

// Initialize OpenAI client with Gemini compatibility
const openai = new OpenAI({
  apiKey: GOOGLE_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

const worker = new Worker(
  'file-upload',
  async (job) => {
    try {
      console.log(`Job:`, job.data);
      const data = job.data;
      const userId = job.data.userId;
      console.log("UserID: ", userId)
      
      // Load PDF file
      const loader = new PDFLoader(data.path);
      const docs = await loader.load();
      console.log("✅ PDF loaded!");

      // Create custom embeddings function using OpenAI (Gemini compatible)
      const embeddingsFunction = {
        embedQuery: async (query) => {
          const result = await openai.embeddings.create({
            model: "text-embedding-004",
            input: query,
          });
          return result.data[0].embedding;
        },
        embedDocuments: async (documents) => {
          const result = await openai.embeddings.create({
            model: "text-embedding-004",
            input: documents,
          });
          return result.data.map(item => item.embedding);
        }
      };

      console.log("✅ OpenAI Embeddings initialized with Gemini compatibility!");

      // Connect to Qdrant and add documents
      const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddingsFunction,
        {
          url: QDRANT_URL,
          collectionName: `user-${userId}`,
        }
      );

      await vectorStore.addDocuments(docs);
      console.log(`✅ All docs added to vector store`);
    } catch (err) {
      console.error("❌ Worker failed with error:", err);
    }
  },
  {
    concurrency: 100,
    connection: {
      host: HOST,
      port: BULLMQ_PORT,
    },
  }
);
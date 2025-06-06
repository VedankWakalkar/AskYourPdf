import { Worker } from 'bullmq';
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from '@langchain/qdrant';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { BULLMQ_PORT, GOOGLE_API_KEY, HOST, QDRANT_URL } from './config/env.js';

const worker = new Worker(
  'file-upload',
  async (job) => {
    try {
      console.log(`Job:`, job.data);
      const data = job.data;
      const userId=job.data.userId;
      console.log(
        "UserID: ",userId
      )
      // Load PDF file
      const loader = new PDFLoader(data.path);
      const docs = await loader.load();
      console.log("✅ PDF loaded!");

      // Initialize Gemini embeddings
      const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: GOOGLE_API_KEY,
      });
      console.log("✅ Gemini Embeddings initialized!");

      // Connect to Qdrant and add documents
      const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
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

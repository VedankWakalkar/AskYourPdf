import express from "express";
import cors from 'cors'
import multer from "multer";
import { Queue } from 'bullmq';
import { HOST } from "./config/env.js";
import { BULLMQ_PORT } from "./config/env.js";

const app = express();
app.use(cors())
app.use(express.json())

const queue=new Queue('file-upload',{connection:{
    host:HOST,
    port:BULLMQ_PORT
}})

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
      path: req.file.path,
    }
  );
  return res.json({ message: 'uploaded' });
});

app.listen(8080,()=>{
    console.log("Server is Running")
})
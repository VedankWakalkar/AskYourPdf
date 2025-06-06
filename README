# 📄 AskYourPDF – AI-Powered PDF RAG Platform  
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/VedankWakalkar/AskYourPdf)

A full-stack PDF-RAG (Retrieval Augmented Generation) platform built using **Gemini 1.5 Flash**, **Next.js**, **Qdrant**, and **Clerk**. Authenticated users can upload PDFs, which are semantically embedded and stored for intelligent retrieval.

🎥 **Working Demo Video**: [Watch Here](https://drive.google.com/file/d/1zD6TQVMHX9RBDpSERwlZ7fJkIRxp3gIX/view?usp=drive_link)

---

## 🔧 Tech Stack

### 🧠 Backend
- **Node.js**, **Express.js** – API server
- **BullMQ + Redis** – Background job queue
- **LangChain.js** – PDF parsing & embedding pipeline
- **Gemini 1.5 Flash** – Embedding generation
- **Qdrant** – Vector database for semantic retrieval

### 🌐 Frontend
- **Next.js 14** – React-based frontend
- **Clerk.dev** – User authentication
- **Tailwind CSS** – UI styling
- **Axios** – API communication

---

## 🚀 Features

- 🔐 Secure login with Clerk
- 📄 Upload and semantically process PDFs
- 🧠 Generate vector embeddings via Gemini
- 💾 Store embeddings in Qdrant
- ⏳ Background job processing via BullMQ
- 📊 Upload progress and job status UI

---

## 🖼️ System Architecture

```yaml
Client (Next.js + Clerk)
    |
    |— Authenticated Upload Request
    v
Express API Server (PDF Upload)
    |
    |— Push job to Redis Queue (BullMQ)
    v
PDF Worker (LangChain + Gemini)
    |
    |— Generate Embeddings → Store in Qdrant
    v
Semantic Search/Retrieval (Coming Soon)
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/VedankWakalkar/AskYourPdf.git
cd AskYourPdf
```

### 2. Backend Setup (`/server`)

```bash
cd server
npm install
```

Create a `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Start Redis & Qdrant using Docker:

```bash
docker compose up -d
```

Run the API and Worker:

```bash
node server.js     # Express server
node worker.js     # BullMQ worker
```

### 3. Frontend Setup (`/client`)

```bash
cd ../client
npm install
```

Set up Clerk at [Clerk.dev](https://clerk.dev) and add the following to `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

Run the dev server:

```bash
npm run dev
```

Visit [http://localhost:8080](http://localhost:8080) to try the app.

---

## 📁 Project Structure

```
AskYourPdf/
├── server/
│   ├── server.js          # Express API
│   ├── worker.js          # BullMQ + LangChain + Gemini
│   └── uploads/           # Uploaded PDFs
│
├── client/
│   ├── pages/             # Next.js pages
│   ├── components/        # React components
│   └── utils/             # Utility functions
│
├── docker-compose.yml     # Redis & Qdrant
└── README.md
```

---

## 📄 Sample Job Payload

```json
{
  "filename": "somatosensory.pdf",
  "destination": "uploads/",
  "path": "uploads/1748692941700-275539632-somatosensory.pdf"
}
```

---

## 🔐 Auth Flow with Clerk

- User registration and login via Clerk
- Uploads restricted to authenticated users
- Future plans: user-specific upload tracking and analytics

---

## ✅ TODO / Improvements

- [ ] Deploy frontend (Vercel) & backend (Render/Railway)

---

## 👨‍💻 Author

**Vedank Wakalkar**  
[GitHub](https://github.com/VedankWakalkar) • [LinkedIn](https://www.linkedin.com/in/vedank-wakalkar-05a6a2256/)
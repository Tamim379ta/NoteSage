<div align="center">

# 📚 NoteSage

### AI-Powered Study Companion for Smarter Learning

Turn lengthy lecture notes and PDFs into concise summaries, then chat with your documents using AI.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss)
![Groq](https://img.shields.io/badge/AI-Groq-orange)

</div>

<div align="center">

## 🚀 Live Demo

🌐 **Website:** [click here](https://note-sage-delta.vercel.app/)

</div>

---

## ✨ Overview

**NoteSage** is an AI-powered learning platform that helps students study more efficiently.

Instead of reading hundreds of pages of lecture notes, simply upload your study materials and let AI generate concise summaries. Need more details? Ask questions in the built-in AI chat, and NoteSage answers using the context from your uploaded documents.

Whether you're preparing for exams or reviewing class materials, NoteSage makes learning faster, simpler, and more interactive.

---

# 🚀 Features

### 🤖 AI-Powered Summaries

- Upload lecture notes or PDFs
- Generate concise 5–7 point summaries
- Extract important concepts instantly

### 💬 Context-Aware AI Chat

- Ask questions about your uploaded documents
- AI responds using document context (RAG)
- Streaming responses powered by Groq Llama 3

### 📂 Personal Study Library

- Store all study materials
- Organize notes in one place
- Easy access anytime

### 🌎 Explore Community Materials

- Browse public study resources
- Learn from materials shared by others
- Discover useful notes across different subjects

### 🔐 Authentication

- Secure user authentication
- Personal dashboard
- Private and public document visibility

### ⚡ Fast Performance

- Next.js App Router
- Server Components
- Optimized rendering
- Streaming AI responses

---

# 🛠 Tech Stack

## Frontend

- Next.js (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- React Fast Marquee
- React Icons

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## AI

- Groq API
- Llama 3
- Retrieval-Augmented Generation (RAG)
- AI Document Summarization

## Authentication

- Better Auth

---

# 📁 Project Structure

```text
src
│
├── app
│   ├── (auth)
│   │   ├── login
│   │   └── register
│   │
│   ├── about
│   ├── api
│   ├── chat
│   ├── contact
│   │
│   ├── explore
│   │   ├── page.tsx
│   │   └── [id]
│   │       └── page.tsx
│   │
│   ├── materials
│   │   ├── add
│   │   │   └── page.tsx
│   │   └── manage
│   │       └── page.tsx
│   │
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── loading.tsx
│
├── components
│
├── hooks
│
├── lib
│
├── services
│
├── types
│
└── utils
```

---

# 📸 Application Flow

```text
User
   │
   ▼
Upload Study Material
   │
   ▼
Extract Text
   │
   ▼
Generate AI Summary
   │
   ▼
Store in MongoDB
   │
   ▼
Ask Questions
   │
   ▼
Retrieve Document Context
   │
   ▼
Groq Llama 3
   │
   ▼
Streaming AI Response
```

---

# 💡 How It Works

### 📤 Upload

Upload lecture slides, PDFs, or study notes.

↓

### 🧠 Summarize

AI extracts the important concepts and creates an easy-to-read summary.

↓

### 💬 Chat

Ask questions naturally. The AI searches your uploaded content before generating answers.

↓

### 📚 Learn

Review summaries, revisit materials, and prepare for exams more efficiently.

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/Tamim379ta/NoteSage.git

cd NoteSage
```

## Install dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env.local` file.

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000

MONGODB_URI=your_mongodb_uri

GROQ_API_KEY=your_groq_api_key

BETTER_AUTH_SECRET=your_auth_secret
```

---

# ▶️ Run Locally

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 🎯 Future Improvements

- PDF highlighting
- Multiple AI models
- Folder organization
- Flashcard generation
- Quiz generation
- OCR support for scanned PDFs
- Collaborative study groups
- Export AI summaries as PDF

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 👨‍💻 Author

**Tamim Tahsan**

GitHub: https://github.com/Tamim379ta

---

<div align="center">

### ⭐ If you found this project helpful, consider giving it a star!

Made with ❤️ using Next.js, MongoDB, and Groq AI.

</div>

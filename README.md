# 🚀 Quizzoc - Top 1% Multiplayer Trivia Game

Quizzoc is a flagship, production-grade real-time multiplayer trivia game. We have completely migrated from a legacy EJS monolith to a cutting-edge **Next.js + Socket.io + Redis** architecture. Compete against others in real-time, climb the ELO ranks, and experience lightning-fast gamified interactions!

![Quizzoc Live](https://img.shields.io/badge/Status-Live-brightgreen)
![Next.js](https://img.shields.io/badge/Frontend-Next.js_15-black)
![Node.js](https://img.shields.io/badge/Backend-Node.js_Socket.io-339933)
![Redis](https://img.shields.io/badge/Matchmaking-Redis-dc382d)

---

## 🔗 Live Demo
Experience the Top 1% architecture live here:  
🎮 **[Play Quizzoc Now](https://quizzoc.vercel.app)**  
*(Backend API powered by [Render](https://quizzoc.onrender.com))*

---

## ✨ Top 1% Features
- **Real-Time Matchmaking**: Uses Redis Sorted Sets (ZSETs) to instantly pair players globally based on their ELO rating.
- **Live Multiplayer Gameplay**: Powered by WebSocket (`Socket.io`) for zero-latency question delivery, synced timers, and real-time opponent scoring.
- **Dynamic Speed Scoring**: The faster you answer correctly, the more points you earn.
- **Flagship UI/UX**: Built with Framer Motion and Tailwind CSS v4. Features a dark space theme, glassmorphism, 60fps micro-animations, and dynamic visual feedback.
- **Secure Authentication**: JWT-based secure user sessions and fully hashed credentials stored in MongoDB Atlas.

---

## 🛠️ Technology Stack
### Frontend (Monorepo)
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Real-Time Client**: `socket.io-client`
- **Deployment**: Vercel Edge Network

### Backend (Monorepo)
- **Runtime**: Node.js & Express.js
- **Real-Time Engine**: `socket.io`
- **Database**: MongoDB Atlas (Mongoose)
- **State & Matchmaking**: Redis (ioredis)
- **Deployment**: Render (Dedicated Web Service)

---

## 👨‍💻 Developed By
**Anuj Yadav & Ashish Singh**  
*An enterprise-grade real-time gaming transformation.*

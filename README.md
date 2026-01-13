# GigFlow Frontend

Modern React-based frontend for the GigFlow freelance marketplace platform.

## 🚀 Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.io Client** - Real-time notifications
- **Axios** - HTTP client

## 📋 Features

- 🔐 JWT-based authentication (Cookie + Authorization header fallback)
- 💼 Dual role system (Client & Freelancer)
- ⚡ Real-time notifications and bid status updates
- 🎨 Modern dark-themed UI with glassmorphism
- 🔍 Gig search functionality
- 📊 User dashboard with live updates
- 📱 Responsive design
- ⏱️ Cold start loader for free tier backends

## 🛠️ Local Development Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running (see backend README)

### Installation

1. **Clone the repository** (if not already done):

   ```bash
   git clone <repository-url>
   cd GigFlow/frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create environment file**:

   ```bash
   touch .env
   ```

4. **Configure environment variables**:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start development server**:

   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Deploy to Vercel (Recommended - Free)

1. **Push code to GitHub**

2. **Deploy via Vercel Dashboard**:

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Add environment variable:
     - `VITE_API_URL` = `https://your-backend.onrender.com/api`
   - Click "Deploy"

3. **Or deploy via CLI**:
   ```bash
   npm i -g vercel
   cd frontend
   vercel
   ```

### Deploy to Netlify (Free)

1. **Configure**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables:
     - `VITE_API_URL` = `https://your-backend.onrender.com/api`

### Deploy to Cloudflare Pages (Free)

1. **Configure**:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `frontend`
   - Environment variable:
     - `VITE_API_URL` = `https://your-backend.onrender.com/api`

## 🔧 Configuration

### Environment Variables

| Variable       | Description          | Example                     |
| -------------- | -------------------- | --------------------------- |
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

### Important Notes

- All environment variables must be prefixed with `VITE_` to be accessible
- Update `VITE_API_URL` to point to your deployed backend URL in production
- The backend URL should NOT include a trailing slash

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── GigFeed.jsx
│   │   ├── GigDetails.jsx
│   │   ├── CreateGig.jsx
│   │   ├── Navbar.jsx
│   │   ├── Notification.jsx
│   │   ├── ColdStartLoader.jsx    # New: Cold start indicator
│   │   └── ProtectedRoute.jsx
│   ├── services/
│   │   ├── api.js                 # Axios + Authorization header
│   │   └── socket.js              # Socket.io client
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.js       # Auth + localStorage
│   │   │   ├── gigsSlice.js
│   │   │   ├── bidsSlice.js       # Real-time bid updates
│   │   │   ├── notificationsSlice.js
│   │   │   └── coldStartSlice.js  # New: Cold start detection
│   │   └── index.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── .env
├── package.json
└── vite.config.js
```

## 🔐 Authentication

### How It Works

1. User logs in → Backend returns JWT token
2. Token stored in **localStorage** (for Authorization header)
3. Token also set as **HttpOnly cookie** (fallback)
4. Every API request includes `Authorization: Bearer <token>` header
5. Protected routes check authentication status

### Why Both Cookie and Header?

- **Cookies**: More secure (HttpOnly), but blocked by some browsers cross-origin
- **Authorization Header**: Works reliably cross-origin, stored in localStorage
- **Fallback**: Backend accepts both, header takes priority

## 🔄 State Management

Redux Toolkit slices:

- **authSlice** - User authentication + token management
- **gigsSlice** - Gig listings and management
- **bidsSlice** - Bid management + real-time updates
- **notificationsSlice** - Real-time notifications
- **coldStartSlice** - Cold start detection for free tier backends

## ⚡ Real-Time Features

### Socket.io Integration

- **Hire Notifications**: Instant toast when freelancer gets hired
- **Bid Status Updates**: Badge changes from "pending" → "hired" in real-time
- **No Polling**: Uses WebSocket for efficient real-time updates

### Cold Start Loader

- Detects when backend is waking up (free tier hosting)
- Shows countdown timer (up to 50 seconds)
- Improves UX for Render/Railway free tier deployments

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Dark theme** by default with vibrant accents
- **Glassmorphism** effects for modern look
- **Responsive design** for mobile and desktop
- **Smooth animations** for better UX

## 🐛 Troubleshooting

### API Connection Issues

**CORS errors:**

- Ensure backend is running
- Check `VITE_API_URL` in `.env`
- Verify backend CORS includes your frontend URL

**401 Unauthorized:**

- Check if token exists in localStorage
- Try logging out and logging in again
- Verify backend is deployed with latest code

### Build Errors

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Socket.io Connection Issues

- Ensure backend Socket.io server is running
- Check backend URL in socket.js
- Verify CORS settings on backend

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a Pull Request.

---

Built with ❤️ using React + Vite

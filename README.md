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

- 🔐 JWT-based authentication with protected routes
- 💼 Dual role system (Client & Freelancer)
- ⚡ Real-time notifications
- 🎨 Modern dark-themed UI
- 🔍 Gig search functionality
- 📊 User dashboard
- 📱 Responsive design

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
   # Create .env file in the frontend directory
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

1. **Install Vercel CLI** (optional):

   ```bash
   npm i -g vercel
   ```

2. **Deploy via GitHub**:

   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Add environment variable:
     - `VITE_API_URL` = `<your-backend-url>/api`
   - Click "Deploy"

3. **Deploy via CLI**:
   ```bash
   cd frontend
   vercel
   ```

### Deploy to Netlify (Free)

1. **Build the project**:

   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI**:

   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

3. **Or use Netlify UI**:

   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your GitHub repository

4. **Configure**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables:
     - `VITE_API_URL` = `<your-backend-url>/api`

### Deploy to Cloudflare Pages (Free)

1. **Push to GitHub**

2. **Connect to Cloudflare Pages**:
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)
   - Connect your GitHub repository
   - Configure:
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
     - **Root directory**: `frontend`
   - Add environment variable:
     - `VITE_API_URL` = `<your-backend-url>/api`

## 🔧 Configuration

### Environment Variables

| Variable       | Description          | Example                     |
| -------------- | -------------------- | --------------------------- |
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

### Important Notes

- All environment variables must be prefixed with `VITE_` to be accessible in the app
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
│   │   └── ProtectedRoute.jsx
│   ├── services/
│   │   ├── api.js          # Axios configuration
│   │   └── socket.js       # Socket.io client
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── gigsSlice.js
│   │   │   ├── bidsSlice.js
│   │   │   └── notificationsSlice.js
│   │   └── index.js        # Redux store
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── .env
├── package.json
└── vite.config.js
```

## 🔐 Authentication Flow

1. User registers/logs in via `/login` or `/register`
2. Backend returns JWT token in HttpOnly cookie
3. Token is automatically sent with each request
4. Protected routes check authentication status
5. Unauthenticated users are redirected to login

## 🔄 State Management

The app uses Redux Toolkit with the following slices:

- **authSlice** - User authentication state
- **gigsSlice** - Gig listings and management
- **bidsSlice** - Bid management
- **notificationsSlice** - Real-time notifications

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Dark theme** by default
- **Responsive design** for mobile and desktop
- Custom components with consistent design system

## 🐛 Troubleshooting

### API Connection Issues

If you see CORS errors:

- Ensure backend is running
- Check `VITE_API_URL` in `.env`
- Verify backend CORS configuration includes your frontend URL

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Socket.io Connection Issues

- Ensure backend Socket.io server is running
- Check that the Socket.io client is connecting to the correct backend URL
- Verify CORS settings on the backend

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue in the repository.

---

Built with ❤️ using React + Vite

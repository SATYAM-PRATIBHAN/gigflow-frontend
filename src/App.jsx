import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./store/slices/authSlice";
import { addNotification } from "./store/slices/notificationsSlice";
import { updateBidStatus } from "./store/slices/bidsSlice";
import { initSocket, getSocket } from "./services/socket";

// Components
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import ColdStartLoader from "./components/ColdStartLoader";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import GigFeed from "./components/GigFeed";
import GigDetails from "./components/GigDetails";
import CreateGig from "./components/CreateGig";
import Dashboard from "./components/Dashboard";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is logged in
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    // Initialize socket connection when user is authenticated
    if (isAuthenticated && user) {
      const socket = initSocket(user.id);

      // Listen for hire notifications
      socket.on("hired", (data) => {
        // Show notification
        dispatch(
          addNotification({
            message: data.message,
            gigId: data.gigId,
            gigTitle: data.gigTitle,
          })
        );

        // Update bid status in real-time
        if (data.bidId) {
          dispatch(
            updateBidStatus({
              bidId: data.bidId,
              status: "hired",
            })
          );
        }
      });

      return () => {
        const currentSocket = getSocket();
        if (currentSocket) {
          currentSocket.off("hired");
        }
      };
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Notification />
        <ColdStartLoader />

        <Routes>
          <Route path="/" element={<GigFeed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gigs/:id" element={<GigDetails />} />

          <Route
            path="/create-gig"
            element={
              <ProtectedRoute>
                <CreateGig />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

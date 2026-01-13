"use client"

import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../store/slices/authSlice"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  const handleLogout = async () => {
    await dispatch(logout())
    navigate("/login")
  }

  return (
    <nav className="border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-slate-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            GigFlow
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {isAuthenticated ? (
              <>
                <div className="hidden sm:flex items-center gap-1">
                  <Link
                    to="/"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 transition-colors"
                  >
                    Browse Gigs
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/create-gig"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 transition-colors"
                  >
                    Post a Gig
                  </Link>
                </div>

                <div className="flex items-center gap-3 border-l border-neutral-200 dark:border-neutral-700 pl-6">
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-400">{user?.name}</div>
                  <button onClick={handleLogout} className="btn-secondary text-sm">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="btn-secondary text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

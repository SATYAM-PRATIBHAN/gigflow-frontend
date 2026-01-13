"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchGigs } from "../store/slices/gigsSlice"

const GigFeed = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { gigs, loading } = useSelector((state) => state.gigs)
  const [search, setSearch] = useState("")

  useEffect(() => {
    dispatch(fetchGigs({ search, status: "open" }))
  }, [dispatch, search])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Discover Opportunities</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Browse the latest gigs from talented professionals and find the perfect match for your project.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search gigs by title, skills, or keywords..."
              value={search}
              onChange={handleSearch}
              className="input-field pl-12 py-3 text-base"
            />
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Loading gigs...</p>
            </div>
          </div>
        ) : gigs.length === 0 ? (
          <div className="text-center py-20">
            <svg
              className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">No gigs found</p>
            <p className="text-slate-500 dark:text-slate-500 mt-2">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <div key={gig._id} className="card cursor-pointer group" onClick={() => navigate(`/gigs/${gig._id}`)}>
                {/* Header */}
                <div className="flex justify-between items-start mb-4 gap-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {gig.title}
                    </h3>
                  </div>
                  <span className="badge badge-open flex-shrink-0">{gig.status}</span>
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 text-sm leading-relaxed">
                  {gig.description}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-end border-t border-slate-200 dark:border-slate-700 pt-4">
                  <div>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">${gig.budget}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Budget</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Posted by</p>
                    <p className="font-medium text-slate-900 dark:text-white text-sm">{gig.ownerId?.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GigFeed

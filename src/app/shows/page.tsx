'use client'

import { useState, useEffect } from 'react'
import { ShowWithDetails } from '@/types/database'

interface ShowsResponse {
  data: ShowWithDetails[]
  count: number
}

export default function ShowsPage() {
  const [shows, setShows] = useState<ShowWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedComedian, setSelectedComedian] = useState('')
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)

  const fetchShows = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams()
      params.append('limit', itemsPerPage.toString())
      params.append('offset', ((currentPage - 1) * itemsPerPage).toString())
      
      if (selectedCity) params.append('city', selectedCity)
      if (selectedDate) params.append('date', selectedDate)
      if (selectedComedian) params.append('comedian', selectedComedian)
      
      const response = await fetch(`/api/shows?${params}`)
      if (!response.ok) {
        throw new Error('Failed to fetch shows')
      }
      
      const data: ShowsResponse = await response.json()
      setShows(data.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchShows()
  }, [currentPage, selectedCity, selectedDate, selectedComedian, itemsPerPage])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    setSelectedComedian(searchQuery)
  }

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedCity('')
    setSelectedDate('')
    setSelectedComedian('')
    setCurrentPage(1)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (timeString?: string) => {
    if (!timeString) return null
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Live Comedy Shows
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover upcoming stand-up comedy performances near you
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search by comedian */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Comedian
                </label>
                <input
                  id="search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Jerry Seinfeld..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* City filter */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City
                </label>
                <select
                  id="city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Cities</option>
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Chicago">Chicago</option>
                  <option value="Boston">Boston</option>
                  <option value="San Francisco">San Francisco</option>
                </select>
              </div>

              {/* Date filter */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col justify-end space-y-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading shows...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
          </div>
        )}

        {/* Shows grid */}
        {!loading && !error && (
          <>
            {shows.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  No shows found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {shows.map((show) => (
                  <div key={show.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Show image */}
                    {show.image_url && (
                      <img
                        src={show.image_url}
                        alt={show.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    
                    <div className="p-6">
                      {/* Show title */}
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                        {show.title}
                      </h3>
                      
                      {/* Venue info */}
                      {show.venue && (
                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          <span className="font-medium">{show.venue.name}</span>
                          {show.venue.city && (
                            <span> • {show.venue.city}</span>
                          )}
                        </div>
                      )}
                      
                      {/* Date and time */}
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <div>{formatDate(show.show_date)}</div>
                        {show.show_time && (
                          <div>Show: {formatTime(show.show_time)}</div>
                        )}
                        {show.doors_open && (
                          <div>Doors: {formatTime(show.doors_open)}</div>
                        )}
                      </div>
                      
                      {/* Performers */}
                      {show.performers && show.performers.length > 0 && (
                        <div className="mb-4">
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Performers:
                          </div>
                          <div className="space-y-1">
                            {show.performers.map((performer) => (
                              <div key={performer.id} className="text-sm text-gray-600 dark:text-gray-400">
                                <span className="capitalize">{performer.role}:</span> {performer.comedian.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Price and ticket info */}
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          {show.ticket_price_min && show.ticket_price_max && (
                            <span className="font-medium text-green-600 dark:text-green-400">
                              ${show.ticket_price_min} - ${show.ticket_price_max}
                            </span>
                          )}
                          {show.age_restriction && (
                            <div className="text-gray-500 dark:text-gray-400">
                              {show.age_restriction}
                            </div>
                          )}
                        </div>
                        
                        {show.ticket_url && (
                          <a
                            href={show.ticket_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-md transition-colors"
                          >
                            Buy Tickets
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {shows.length > 0 && (
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Previous
                </button>
                
                <span className="text-gray-600 dark:text-gray-300">
                  Page {currentPage}
                </span>
                
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={shows.length < itemsPerPage}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
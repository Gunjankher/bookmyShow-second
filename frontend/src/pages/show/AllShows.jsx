import ShowDetails from '@/components/ShowDetails'
import { getAllShows, deleteShow } from '@/store/Slices/showSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AllShows() {
  const shows = useSelector((state) => state.show.shows)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllShows())
  }, [dispatch])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this show?")) {
      dispatch(deleteShow(id))
    }
  }

  return (
    <div className="bg-white p-8 space-y-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-4xl font-semibold text-center text-pink-700 mb-8">🎥 All Shows</h1>

      {shows && shows.length > 0 ? (
        shows.map((show) => (
          <div key={show._id} className="bg-gradient-to-r from-purple-100 via-indigo-50 to-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all relative">
            <ShowDetails show={show} />
            <button
              onClick={() => handleDelete(show._id)}
              className="absolute top-4 right-4 text-sm bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none transition-all"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No shows available.</p>
      )}
    </div>
  )
}

export default AllShows

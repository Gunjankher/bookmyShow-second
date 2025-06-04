import { getAllArtists } from '@/store/Slices/artistSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Actors() {
  const artist = useSelector((state) => state.artist.artists)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllArtists())
  }, [dispatch])

  useEffect(() => {
    console.log(`This is artist`, artist)
  }, [artist])

  return (
    <>
      {/* Header Section */}
      <div className="w-full border h-[80px] my-10 text-gray-800 flex rounded-2xl items-center justify-between px-8 bg-white shadow-lg hover:shadow-xl transition-all">
        <h1 className="text-3xl font-semibold">Actors</h1>
        <button
          onClick={() => navigate(`/admin/actor/create`)}
          className="bg-pink-500 text-white w-[60px] h-[60px] rounded-full flex items-center justify-center text-2xl shadow-md hover:bg-purple-700 transition-all duration-300"
        >
          +
        </button>
      </div>

      {/* Artist List Section */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
        {artist.map((artist) => (
          <button
            key={artist._id}
            onClick={() => navigate(`/admin/actor/${artist._id}`)}
            className="border border-gray-300 rounded-2xl p-4 flex items-center justify-between bg-white shadow-md hover:shadow-lg transition-all hover:bg-gray-50 cursor-pointer"
          >
            <img
              className="w-[60px] h-[60px] rounded-full object-cover border-2 border-gray-300"
              src={artist.avatar}
              alt={artist.name}
            />
            <p className="text-lg font-medium text-gray-700 ml-4">{artist.name}</p>
          </button>
        ))}
      </div>
    </>
  )
}

export default Actors

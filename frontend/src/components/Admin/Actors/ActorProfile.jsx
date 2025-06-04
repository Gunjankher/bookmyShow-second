import { deleteArtist, getArtistById } from '@/store/Slices/artistSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function ActorProfile() {

  const artist = useSelector((state) => state.artist.selectedArtist)
  const { artistId } = useParams()

  console.log(`this is `, artistId);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (artistId) {
      dispatch(getArtistById(artistId));
    }
  }, [artistId, dispatch]);

  useEffect(() => {
    console.log(`this is artist`, artist);
  }, [artist])

  const deleteArtistbtn = async (artistId) => {
    await dispatch(deleteArtist(artistId))
    navigate('/admin/actor')
  }

  return (
    <div className='bg-white text-gray-800 w-full min-h-screen flex flex-col items-center justify-center py-10'>
      {artist && (
        <div className='w-full max-w-3xl px-5 py-8 bg-white shadow-lg rounded-lg flex flex-col items-center'>
          <img src={artist.avatar} className='w-[200px] h-[250px] rounded-2xl mb-5 object-cover' alt="" />
          <div className='text-xl font-semibold mb-3'>Name: {artist.name}</div>
          <div className='text-lg mb-3'>Born: {artist.born}</div>
          <div className='text-lg mb-3'>Description: {artist.description}</div>
          <div className='text-lg mb-3'>Occupation: {artist.occupation.join(', ')}</div>
        </div>
      )}

      <div>
        <button
          className='bg-pink-500 text-white w-30 h-10 mt-5 rounded-2xl hover:bg-pink-700 transition duration-300'
          onClick={() => {
            deleteArtistbtn(artistId)
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ActorProfile

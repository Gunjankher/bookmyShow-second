import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getTheaterById, updateTheater } from '@/store/Slices/theaterSlice'

function EditTheater() {
  const { theaterId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const theater = useSelector((state) => state.theater.selectedTheater)

  // Fetch theater on load
  useEffect(() => {
    dispatch(getTheaterById({theaterId}))
  }, [dispatch])

  useEffect(() => {
    console.log(`theaterdata`, theater)
  }, [theater])

  // Pre-fill form once data is fetched
  useEffect(() => {
    if (theater && Object.keys(theater).length > 0) {
      reset({
        name: theater.name || '',
        location: theater.location || '',
        capacity: theater.capacity || '',
        facilities: theater.facilities || []
      })
    }
  }, [theater, reset])

  const onSubmit = async (data) => {
    console.log('Updating Theater with data:', data)
    await dispatch(updateTheater({ theaterId, data }))
    navigate('/admin/theaters')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto text-white flex flex-col gap-4 p-6 rounded-lg shadow-lg bg-white"
    >
      <h2 className="text-2xl font-bold mb-4 text-pink-500">Edit Theater</h2>

      {/* Name */}
      <div>
        <label className="text-pink-500">Name</label>
        <input
          type="text"
          {...register('name', { required: 'Theater name is required' })}
          className="input-field border w-full text-gray-700 focus:ring-2 focus:ring-pink-500"
        />
        {errors.name && <p className="text-pink-500">{errors.name.message}</p>}
      </div>

      {/* Location */}
      <div>
        <label className="text-pink-500">Location</label>
        <input
          type="text"
          {...register('location', { required: 'Location is required' })}
          className="input-field border w-full text-gray-700 focus:ring-2 focus:ring-pink-500"
        />
        {errors.location && <p className="text-pink-500">{errors.location.message}</p>}
      </div>

      {/* Capacity */}
      <div>
        <label className="text-pink-500">Capacity</label>
        <input
          type="number"
          {...register('capacity', {
            required: 'Capacity is required',
            min: { value: 1, message: 'Capacity must be at least 1' },
          })}
          className="input-field border w-full text-gray-700 focus:ring-2 focus:ring-pink-500"
        />
        {errors.capacity && <p className="text-pink-500">{errors.capacity.message}</p>}
      </div>

      {/* Facilities */}
      <div>
        <label className="text-pink-500">Facilities (Hold Ctrl/Command to select multiple)</label>
        <select
          multiple
          {...register('facilities', { required: 'Select at least one facility' })}
          className="input-field border w-full text-gray-700 focus:ring-2 focus:ring-pink-500"
        >
          <option value="Parking">Parking</option>
          <option value="Food Court">Food Court</option>
          <option value="Wheelchair Accessible">Wheelchair Accessible</option>
          <option value="Dolby Sound">Dolby Sound</option>
        </select>
        {errors.facilities && <p className="text-pink-500">{errors.facilities.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg mt-4"
      >
        Update Theater
      </button>
    </form>
  )
}

export default EditTheater

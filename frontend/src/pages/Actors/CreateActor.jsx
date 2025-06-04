import GetImagePreview from '@/components/GetImagePreview'
import { createArtist } from '@/store/Slices/artistSlice'
import React from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function CreateActor() {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      occupation: "",
      born: "2001-01-01",
      avatar: '',
      description: ""
    }
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    console.log(`Creating actor with`, data);
    dispatch(createArtist(data))
    navigate(`/admin/actor`)
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6 text-gray-800 bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto"
    >
      <h1 className="text-3xl font-semibold text-center text-pink-500">Create Actor</h1>

      {/* Name Field */}
      <div className="flex flex-col">
        <label className="text-lg font-medium">Name</label>
        <input 
          {...register("name", { required: true })} 
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
      </div>

      {/* Occupation Field */}
      <div className="flex flex-col">
        <label className="text-lg font-medium">Occupation</label>
        <input 
          {...register("occupation", { required: true })} 
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
      </div>

      {/* Born Date Field */}
      <div className="flex flex-col">
        <label className="text-lg font-medium">Born</label>
        <input 
          type="date" 
          {...register("born", { required: true })} 
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
      </div>

      {/* Description Field */}
      <div className="flex flex-col">
        <label className="text-lg font-medium">Description</label>
        <textarea 
          {...register("description", { required: true })} 
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
      </div>

      {/* Image Preview Section */}
      <div className="flex flex-col">
        <label className="text-lg font-medium">Avatar</label>
        <div className="grid grid-cols-1 gap-4">
          <GetImagePreview 
            name="avatar" 
            control={control} 
            label="Avatar" 
            cameraIcon 
            className="w-full h-48 object-cover border-2 border-gray-300 rounded-full shadow-md"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="w-full py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 focus:outline-none transition-all duration-300"
      >
        Create Actor
      </button>
    </form>
  )
}

export default CreateActor

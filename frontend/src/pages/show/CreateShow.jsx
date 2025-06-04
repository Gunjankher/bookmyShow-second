import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createShow } from '@/store/Slices/showSlice';
import { getAllMovies } from '@/store/Slices/movieSlice';
import { getTheaterById } from '@/store/Slices/theaterSlice'; // assuming this exists
import { useNavigate, useParams } from 'react-router-dom';

function CreateShow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theaterId } = useParams(); // assuming you're passing theaterId via route params

  console.log(`theaterID`, theaterId);

  const [screenId, setScreenId] = useState("");

  const movies = useSelector((state) => state.movie.movies);
  const theaterById = useSelector((state) => state.theater.selectedTheater);
  const loading = useSelector((state) => state.show.loading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    dispatch(getAllMovies());
    dispatch(getTheaterById({ theaterId })); // fetch screen info from theater
  }, [dispatch, theaterId]);

  const onSubmit = (data) => {
    if (!screenId) {
      return alert("Please select a screen");
    }

    const selectedScreen = theaterById?.screens?.find(screen => screen._id === screenId);

    const formData = {
      ...data,
      screenName: selectedScreen?.name, // send screen name
      theaterId,
    };

    dispatch(createShow(formData))
      .unwrap()
      .then(() => {
        reset();
        setScreenId("");
        navigate('/admin/shows/all');
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 text-gray-900 p-4 max-w-xl mx-auto bg-white rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-semibold mb-4 text-pink-500">Create Show</h1>

      {/* Select Screen */}
      <div>
        <label className="block mb-1 text-pink-500">Select Screen</label>
        <select
          value={screenId}
          onChange={(e) => setScreenId(e.target.value)}
          className="w-full p-3 rounded-lg border-2 border-pink-500 bg-transparent text-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
        >
          <option value="">-- Choose Screen --</option>
          {theaterById?.screens?.map((screen) => (
            <option key={screen._id} value={screen._id}>
              {screen.name} ({screen.format})
            </option>
          ))}
        </select>
      </div>

      {/* Movie Select */}
      <div>
        <label className="block text-pink-500">Movie</label>
        <select
          {...register("movie", { required: true })}
          className="w-full p-3 rounded-lg border-2 border-pink-500 bg-transparent text-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
        >
          <option value="">Select a movie</option>
          {movies?.map((movie) => (
            <option key={movie._id} value={movie._id}>
              {movie.title}
            </option>
          ))}
        </select>
        {errors.movie && <p className="text-pink-500 mt-1">Movie is required</p>}
      </div>

      {/* Start Time */}
      <div>
        <label className="block text-pink-500">Start Time</label>
        <input
          type="datetime-local"
          {...register("startTime", { required: true })}
          className="w-full p-3 rounded-lg border-2 border-pink-500 bg-transparent text-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
        />
        {errors.startTime && <p className="text-pink-500 mt-1">Start Time is required</p>}
      </div>

      {/* End Time */}
      <div>
        <label className="block text-pink-500">End Time</label>
        <input
          type="datetime-local"
          {...register("endTime", { required: true })}
          className="w-full p-3 rounded-lg border-2 border-pink-500 bg-transparent text-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
        />
        {errors.endTime && <p className="text-pink-500 mt-1">End Time is required</p>}
      </div>

      {/* Ticket Price */}
      <div>
        <label className="block text-pink-500">Base Ticket Price</label>
        <input
          type="number"
          {...register("baseTicketPrice", { required: true })}
          className="w-full p-3 rounded-lg border-2 border-pink-500 bg-transparent text-pink-500 focus:ring-2 focus:ring-pink-500 focus:outline-none"
        />
        {errors.baseTicketPrice && <p className="text-pink-500 mt-1">Price is required</p>}
      </div>

      <button
        type="submit"
        className={`w-full py-3 rounded-lg ${loading ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600'} text-white font-semibold`}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Show"}
      </button>
    </form>
  );
}

export default CreateShow;

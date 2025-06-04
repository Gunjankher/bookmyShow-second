import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assignMovieScreen, getTheaterById } from '@/store/Slices/theaterSlice';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllMovies } from '@/store/Slices/movieSlice';

function AssignMovie() {
  const dispatch = useDispatch();
  const { theaterId } = useParams();

  const movies = useSelector((state) => state.movie.movies);
  const theaterById = useSelector((state) => state.theater.selectedTheater);
  const navigate = useNavigate();

  const [screenId, setScreenId] = useState('');
  const [movieId, setMovieId] = useState('');

  console.log(`screenId`, screenId);
  console.log(`movieID`, movieId);
  console.log(`theaterId`, theaterId);

  // Fetch theater & movies on mount
  useEffect(() => {
    if (theaterId) {
      dispatch(getTheaterById({ theaterId }));
      dispatch(getAllMovies());
    }
  }, [dispatch, theaterId]);

  const handleAssign = async () => {
    if (!screenId || !movieId) {
      toast.error('Please select both screen and movie');
      return;
    }

    console.log('clicked');

    await dispatch(assignMovieScreen({
      theaterId,
      screenId,
      movieId,
    }));

    navigate('/admin/theaters');

    toast.success('Movie assigned to screen!');
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-gray-500 text-white rounded-xl space-y-4  my-16">
      <h2 className="text-xl font-bold">Assign Movie to Screen</h2>

      {/* Select Screen */}
      <div>
        <label className="block mb-1">Select Screen</label>
        <select
          value={screenId}
          onChange={(e) => setScreenId(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
        >
          <option value="">-- Choose Screen --</option>
          {theaterById?.screens?.map((screen) => (
            <option key={screen._id} value={screen._id}>
              {screen.name} ({screen.format})
            </option>
          ))}
        </select>
      </div>

      {/* Select Movie */}
      <div>
        <label className="block mb-1">Select Movie</label>
        <select
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
        >
          <option value="">-- Choose Movie --</option>
          {movies?.map((movie) => (
            <option key={movie._id} value={movie._id}>
              {movie.title}
            </option>
          ))}
        </select>
      </div>

      {/* Assign Button */}
      <button
        onClick={handleAssign}
        disabled={!screenId || !movieId}
        className={`w-full py-2 rounded ${!screenId || !movieId ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
      >
        ✅ Assign Movie
      </button>
    </div>
  );
}

export default AssignMovie;

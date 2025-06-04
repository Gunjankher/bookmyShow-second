 import { getShowByMovieId } from '@/store/Slices/showSlice';
import { getTheatersByMovie } from '@/store/Slices/theaterSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

function MovieByTheater() {
  const { movieId } = useParams();
  const dispatch = useDispatch();

  const theaterByMovie = useSelector((state) => state.theater?.selectedTheater);
  const showByMovie = useSelector((state) => state?.show?.showByMovie);

  useEffect(() => {
    if (movieId) {
      dispatch(getTheatersByMovie({ movieId }));
      dispatch(getShowByMovieId(movieId));
    }
  }, [dispatch, movieId]);

  useEffect(() => {
    console.log("🎬 theaterByMovie:", theaterByMovie);
    console.log("🎟️ showByMovie:", showByMovie);
  }, [theaterByMovie, showByMovie]);

  // Normalize theater and show data to ensure we always work with arrays
  const normalizedTheaters = Array.isArray(theaterByMovie)
    ? theaterByMovie
    : theaterByMovie
    ? [theaterByMovie]
    : [];

  const normalizedShowByMovie = Array.isArray(showByMovie)
    ? showByMovie
    : showByMovie
    ? [showByMovie]
    : [];

  return (
    <div className="w-full text-black p-4">
      <div className="flex gap-6 overflow-x-auto">
        {normalizedTheaters.map((theater) => {
          const theaterShows = normalizedShowByMovie.filter(
            (show) => show.theater === theater._id
          );

          return (
            <div
              key={theater._id}
              className="min-w-[250px] border border-gray-300 rounded-md shadow-lg p-4"
            >
              <h3 className="font-bold text-lg text-purple-800">
                {theater.name}, {theater.location}
              </h3>
              <div className="text-sm text-gray-600 mb-2">
                Facilities: {Array.isArray(theater.facilities) ? theater.facilities.join(', ') : 'N/A'}
              </div>

              {theaterShows.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {theaterShows.map((show) => (
                    <div key={show._id} className="flex items-center justify-between gap-2">
                      <div className="text-sm">
                        {new Date(show.startTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </div>
                      <Link to={`/SeatBooking/${show._id}`}>
                        <button className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-pink-500 cursor-pointer hover:animate-bounce">
                          {show.screenName}
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-red-400 text-xs italic mt-2">No shows available</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MovieByTheater;

import { createBooking } from '@/store/Slices/bookingSlice';
import { getShowByMovieId } from '@/store/Slices/showSlice';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function Show() {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showByMovie = useSelector((state) => state?.show?.showByMovie);
  const user = useSelector((state) => state.auth?.userData);

  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (movieId) {
      dispatch(getShowByMovieId(movieId));
    }
  }, [dispatch, movieId]);

  const toggleSeatSelection = (seat) => {
    if (seat.status === 'Booked') return;
    const alreadySelected = selectedSeats.find((s) => s._id === seat._id);
    if (alreadySelected) {
      setSelectedSeats((prev) => prev.filter((s) => s._id !== seat._id));
    } else {
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  const handleBooking = async () => {
    if (!showByMovie) return;
    if (!user) {
      toast.error('Please log in first');
      return;
    }

    const bookingData = {
      showId: showByMovie._id,
      selectedSeats: selectedSeats.map((seat) => ({
        row: seat.row,
        number: seat.number,
      })),
      user: user?._id,
    };

    const action = await dispatch(createBooking(bookingData));
    if (createBooking.fulfilled.match(action)) {
      const newBooking = action.payload;
      navigate(`/booking/${newBooking._id}`);
    }
  };

  return (
    <div className="bg-white min-h-screen py-10 px-6">
      {!showByMovie ? (
        <p className="text-gray-700 text-center text-lg">Loading...</p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-10">
          {['Platinum', 'Gold', 'Silver'].map((category) => {
            const seatsByRow = showByMovie.seats
              .filter((seat) => seat.category === category)
              .reduce((acc, seat) => {
                const row = seat.row;
                if (!acc[row]) acc[row] = [];
                acc[row].push(seat);
                return acc;
              }, {});

            return (
              <div key={category}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2 border-gray-300">
                  {category} Class
                </h2>

                <div className="space-y-4">
                  {Object.entries(seatsByRow)
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map(([rowLabel, seatsInRow]) => (
                      <div key={rowLabel} className="flex items-center gap-6">
                        <div className="text-lg font-bold text-gray-600 w-8 text-center">
                          {rowLabel}
                        </div>

                        <div className="grid grid-cols-10 gap-3 w-full">
                          {seatsInRow
                            .sort((a, b) => a.number - b.number)
                            .map((seat) => {
                              const isSelected = selectedSeats.some((s) => s._id === seat._id);
                              const seatColor = seat.status === 'Booked'
                                ? 'bg-red-400 text-white cursor-not-allowed'
                                : isSelected
                                ? 'bg-yellow-400 text-black ring-2 ring-yellow-600'
                                : 'bg-green-500 hover:bg-green-600 text-white hover:scale-105 transition';

                              return (
                                <div
                                  key={seat._id}
                                  className={`w-10 h-10 rounded-md flex items-center justify-center font-medium shadow-md cursor-pointer ${seatColor}`}
                                  onClick={() => toggleSeatSelection(seat)}
                                >
                                  {seat.number}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}

          {selectedSeats.length > 0 && (
            <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50">
              <button
                className="bg-blue-600 text-white py-3 px-10 text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                onClick={handleBooking}
              >
                Book {selectedSeats.length} Seat{selectedSeats.length > 1 ? 's' : ''}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Show;

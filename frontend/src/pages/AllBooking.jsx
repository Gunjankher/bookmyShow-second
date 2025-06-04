import { getAllBookings } from '@/store/Slices/bookingSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AllBooking() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.booking.bookings);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  console.log('bookings', bookings);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-pink-500 mb-4">🎟️ All Bookings</h1>

      {bookings && bookings.length > 0 ? (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white text-gray-800 p-4 rounded-xl shadow-lg"
          >
            <p className="font-semibold">🆔 Booking ID: {booking._id}</p>
            <p>💳 Payment Status: <span className="text-green-400">{booking.paymentStatus}</span></p>
            <p>💰 Total Price: ₹{booking.totalPrice}</p>
            <p>🕒 Booked On: {new Date(booking.createdAt).toLocaleString()}</p>

            <div className="mt-2">
              <p className="font-medium text-lg underline">🎬 Show Info:</p>
              <p>🎞️ Movie: {booking.show?.movie?.title}</p>
              <p>📺 Screen: {booking.show?.screenName}</p>
              <p>🏢 Theater ID: {booking.show?.theater}</p>
              <p>🕐 Start: {new Date(booking.show?.startTime).toLocaleTimeString()}</p>
              <p>🕔 End: {new Date(booking.show?.endTime).toLocaleTimeString()}</p>
            </div>

            <div className="mt-2">
              <p className="font-medium text-lg underline">💺 Seats:</p>
              {booking.seats.map((seat, index) => (
                <div key={index} className="ml-4 text-sm">
                  <p>Row: {seat.row}, Seat No: {seat.number}</p>
                  <p> Price: ₹{seat.price}</p>
                  <p>Status: {seat.status}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No bookings found.</p>
      )}
    </div>
  );
}

export default AllBooking;

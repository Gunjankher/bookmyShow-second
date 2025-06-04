import { getBookingsByUserId } from '@/store/Slices/bookingSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function UserBooking() {

  const{userId} = useParams()

  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.booking.selectedBooking);
  const loading = useSelector((state) => state.booking.loading);
  console.log(`userId`,userId);
  

  useEffect(() => {
    if (userId) {
      dispatch(getBookingsByUserId(userId));
    }
  }, [dispatch, userId]);

  console.log('User Bookings:', bookings);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white mb-4">🎟️ My Bookings</h1>
      {loading ? (
  <p className="text-white">Loading...</p>
) : bookings && bookings.length > 0 ? (
  bookings && bookings.length > 0 && (
    <div
      key={bookings[0]._id}  // Use bookings[0] for a key if you don't want to map over the array
      className="bg-zinc-800 text-white p-4 rounded-xl shadow-lg"
    >
      <p className="font-semibold">🆔 Booking ID: {bookings[0]._id}</p>
      <p>💳 Payment Status: <span className="text-green-400">{bookings[0].paymentStatus}</span></p>
      <p>💰 Total Price: ₹{bookings[0].totalPrice}</p>
      <p>🕒 Booked On: {new Date(bookings[0].createdAt).toLocaleString()}</p>

      <div className="mt-2">
        <p className="font-medium text-lg underline">🎬 Show Info:</p>
        <p>🎞️ Movie: {bookings[0].show?.movie?.title}</p>
        <p>📺 Screen: {bookings[0].show?.screenName}</p>
        <p>🏢 Theater ID: {bookings[0].show?.theater}</p>
        <p>🕐 Start: {new Date(bookings[0].show?.startTime).toLocaleTimeString()}</p>
        <p>🕔 End: {new Date(bookings[0].show?.endTime).toLocaleTimeString()}</p>
      </div>

      <div className="mt-2">
        <p className="font-medium text-lg underline">💺 Seats:</p>
        {bookings[0].seats.map((seat, index) => (
          <div key={index} className="ml-4 text-sm">
            <p>Row: {seat.row}, Seat No: {seat.number}</p>
            <p>Price: ₹{seat.price}</p>
            <p>Status: {seat.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
) : (
  <p className="text-gray-300">No bookings found.</p>
)}

    </div>
  );
}

export default UserBooking;

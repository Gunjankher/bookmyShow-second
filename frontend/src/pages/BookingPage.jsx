import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookingById } from '@/store/Slices/bookingSlice';
import { initiatePayment, updatePayment } from '@/store/Slices/paymentSlice';

function BookingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const { selectedBooking, loading } = useSelector((state) => state.booking);
  const { loading: paymentLoading } = useSelector((state) => state.payment);

  useEffect(() => {
    if (bookingId) {
      dispatch(getBookingById(bookingId));
    }
  }, [dispatch, bookingId]);

  const handleCompletePayment = async () => {
    try {
      // Step 1: Initiate Payment
      const paymentData = await dispatch(
        initiatePayment({
          bookingId,
          paymentMethod: 'Card',
          transactionId: Date.now(),
        })
      ).unwrap();

      const paymentId = paymentData?._id;

      if (!paymentId) {
        console.error('Payment ID missing from response');
        return;
      }

      // Step 2: Update Payment Status
      await dispatch(
        updatePayment({
          paymentId,
          status:"Paid"
        })
      );

      // Step 3: Navigate to Home
      navigate('/');
    } catch (error) {
      console.error('Error during payment process', error);
    }
  };

  if (loading || !selectedBooking) return <p>Loading booking details...</p>;

  return (
    <div className="text-white flex w-full h-screen justify-center items-center bg-gray-900">
      <div className="w-[400px] min-h-[400px] bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700">
        <h1 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2">🎟️ Booking Details</h1>

        <div className="space-y-2 text-sm font-medium">
          <div><span className="text-gray-400">Movie:</span> {selectedBooking.show?.movie?.title}</div>
          <div><span className="text-gray-400">Screen:</span> {selectedBooking.show?.screenName}</div>
          <div><span className="text-gray-400">Seats:</span>{' '}
            {selectedBooking.seats.map((seat) => `${seat?.row}${seat?.number}`).join(', ')}</div>
          <div><span className="text-gray-400">Show Time:</span>{' '}
            {new Date(selectedBooking.show.startTime).toLocaleTimeString([], {
              hour: '2-digit', minute: '2-digit', hour12: true
            })}
          </div>
          <div><span className="text-gray-400">User:</span> {selectedBooking.user?.email}</div>
          <div><span className="text-gray-400">Booking ID:</span> {bookingId}</div>
          <div><span className="text-gray-400">Payment Status:</span> {selectedBooking.paymentStatus}</div>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-4 space-y-3">
          <button
            onClick={handleCompletePayment}
            disabled={paymentLoading}
            className="w-full bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-all text-white font-bold disabled:opacity-50"
          >
            {paymentLoading ? 'Processing...' : `Pay & Confirm ₹${selectedBooking.totalPrice}`}
            
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;

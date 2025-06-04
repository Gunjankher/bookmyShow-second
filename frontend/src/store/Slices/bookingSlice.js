import axiosInstance from '@/helpers/axiosInstance';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
    bookings: [],
    selectedBooking: null,
    loading: false,
};


// Create Booking
export const createBooking = createAsyncThunk("createBooking", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/booking/", data);
        toast.success(response?.data?.message || "Booking created successfully");
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to create booking");
        return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
});

// Get All Bookings
export const getAllBookings = createAsyncThunk("getAllBookings", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/booking/");
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to fetch bookings");
        return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
});

// Get Booking By ID
export const getBookingById = createAsyncThunk("getBookingById", async (bookingId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/booking/${bookingId}`);
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to fetch booking details");
        return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
});

export const getBookingsByUserId = createAsyncThunk(
    "booking/getBookingsByUserId",
    async (userId, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`/booking/user/${userId}`);
        return response.data.data; // array of bookings
      } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to fetch bookings");
        return rejectWithValue(error?.response?.data?.error || "Something went wrong");
      }
    }
  );

// Delete Booking
export const deleteBooking = createAsyncThunk("deleteBooking", async (bookingId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/booking/${bookingId}`);
        toast.success(response?.data?.message || "Booking deleted successfully");
        return bookingId;
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to delete booking");
        return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
});

// Booking Slice
const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create Booking
            .addCase(createBooking.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings.push(action.payload);
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.payload);
            })

            // Get All Bookings
            .addCase(getAllBookings.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(getAllBookings.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.payload);
            })

            // Get Booking By ID
            .addCase(getBookingById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBookingById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedBooking = action.payload;
            })
            .addCase(getBookingById.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.payload);
            })

            // Delete Booking
            .addCase(deleteBooking.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = state.bookings.filter((booking) => booking._id !== action.payload);
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.payload);
            })

              // Get Bookings by UserId
      .addCase(getBookingsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBooking = action.payload;
      })
      .addCase(getBookingsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    },
});

export default bookingSlice.reducer;

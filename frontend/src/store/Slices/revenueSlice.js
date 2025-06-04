import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    totalRevenue: 0,
    revenuePerMovie: [],
    revenuePerMonth: [],
    loading: false,
};

// ✅ Fetch Total Revenue
export const fetchTotalRevenue = createAsyncThunk("totalRevenue", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/revenue/total-revenue");
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to fetch total revenue");
        return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
});

// ✅ Fetch Revenue Per Movie
export const fetchRevenuePerMovie = createAsyncThunk("revenuePerMovie", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/revenue/revenue-per-movie");
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to fetch revenue per movie");
        return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
});

// ✅ Fetch Revenue Per Month
export const fetchRevenuePerMonth = createAsyncThunk("revenuePerMonth", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/revenue/revenue-per-month");
        console.log(`revenue per month slice`,response);
        
        return response.data?.data
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to fetch revenue per month");
        return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
});

// ✅ Create Revenue Slice
const revenueSlice = createSlice({
    name: "revenue",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Total Revenue
            .addCase(fetchTotalRevenue.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTotalRevenue.fulfilled, (state, action) => {
                state.loading = false;
                state.totalRevenue = action.payload.totalRevenue;
            })
            .addCase(fetchTotalRevenue.rejected, (state) => {
                state.loading = false;
            })

            // Revenue Per Movie
            .addCase(fetchRevenuePerMovie.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRevenuePerMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.revenuePerMovie = action.payload;
            })
            .addCase(fetchRevenuePerMovie.rejected, (state) => {
                state.loading = false;
            })

            // Revenue Per Month
            .addCase(fetchRevenuePerMonth.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRevenuePerMonth.fulfilled, (state,action) => {
                state.loading = false;
                console.log("Payload inside reducer:", action.payload);
                state.revenuePerMonth = action.payload;
            })
            .addCase(fetchRevenuePerMonth.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default revenueSlice.reducer;

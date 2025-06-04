import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    payments: [],
    selectedPayment: null,
    loading: false,
};

// ✅ **Initiate Payment**
export const initiatePayment = createAsyncThunk("initiatePayment", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/payment/initiate", data);  
        toast.success(response?.data?.message || "Payment initiated successfully");

        console.log(`response dtata sfafa`,response);
        
        return response.data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to initiate payment");
        return rejectWithValue(error.response?.data?.error || "Something went wrong here");
    }
});

// ✅ **Update Payment**
export const updatePayment = createAsyncThunk("updatePayment", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put("/payment/update", data);
        toast.success(response?.data?.message || "Payment updated successfully");
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to update payment");
        return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
});

// ✅ **Create Payment Slice**
const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ Handle Initiate Payment
            .addCase(initiatePayment.pending, (state) => {
                state.loading = true;
            })
            .addCase(initiatePayment.fulfilled, (state, action) => {
                state.loading = false;
                state.payments.push(action.payload);
            })
            .addCase(initiatePayment.rejected, (state) => {
                state.loading = false;
            })

            // ✅ Handle Update Payment
            .addCase(updatePayment.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePayment.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedPayment = action.payload; // Update payment data
            })
            .addCase(updatePayment.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default paymentSlice.reducer;

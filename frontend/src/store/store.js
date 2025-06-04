import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from '../store/Slices/authSlice'
import adminSliceReducer from '../store/Slices/adminSlice'
import movieSliceReducer from '../store/Slices/movieSlice'
import theaterSliceReducer from './Slices/theaterSlice'
import showSliceReducer from './Slices/showSlice'
import bookingSliceReducer from './Slices/bookingSlice'
import paymentSliceReducer from './Slices/paymentSlice'
import artistSliceReducer from './Slices/artistSlice'
import characterSliceReducer from './Slices/characterSlice'
import revenueSliceReducer from './Slices/revenueSlice'


const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        admin:adminSliceReducer,
        movie:movieSliceReducer,
        theater:theaterSliceReducer,
        show:showSliceReducer,
        booking:bookingSliceReducer,
        payment:paymentSliceReducer,
        artist:artistSliceReducer,
        character:characterSliceReducer,
        revenue: revenueSliceReducer



    }
})


export default store
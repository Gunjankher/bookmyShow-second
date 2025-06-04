import axiosInstance from '@/helpers/axiosInstance'
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import toast from 'react-hot-toast'





const initialState = {
theaters:[],
selectedTheater:null,
loading:false
}




export const createtheater = createAsyncThunk("createTheater",async(data)=>{
    const formData = new FormData()

    formData.append('name',data.name)
    formData.append("location",data.location)
    formData.append("capacity",data.capacity)
    formData.append('owner', data.owner);
    // append faclilites array
    data.facilities.forEach((facility)=>{
        formData.append("facilities",facility)
    })

       // Append screens (assuming it's an array of objects)
       data.screens.forEach((screen, index) => {
        formData.append(`screens[${index}][name]`, screen.name);
        formData.append(`screens[${index}][format]`, screen.format);
        formData.append(`screens[${index}][totalSeats]`, screen.totalSeats);
    });

    try {
        
        const response = await axiosInstance.post("/theater",formData)
        toast.success(response?.data?.message)
        return response?.data.data

    } catch (error) {
        toast.error(error?.response?.data?.error || "failed to create theater")
        throw error
    }

})


export const updateTheater = createAsyncThunk('updateTheater',async({theaterId,data})=>{

    const formData = new FormData()
    formData.append('name',data.name)
    formData.append('location',data.location)
    formData.append('capacity',data.capacity)

     // append faclilites array
     data.facilities.forEach((facility)=>{
        formData.append("facilities",facility)
    })


    try {
        
        const response = await axiosInstance.patch(`/theater/${theaterId}`,formData)

        toast.success(response?.data?.message)
        return response.data.data

    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }

})



export const getAllTheater = createAsyncThunk("getAllTheaters",async()=>{
    try {
       const response = await axiosInstance.get(`/theater/`) 
       toast.success(response.data.message);
       console.log(`this is getAlltheaters`,response);
       
       return response.data.message;
    } catch (error) {
        toast.error(error?.response?.data?.error);
            throw error;
    }
})


export const getTheaterById = createAsyncThunk('getTheaterById',async({theaterId})=>{
    try {
        const response = await axiosInstance.get(`/theater/${theaterId}`)
        console.log(`slice`,response);
        
        return response.data.message;
    } catch (error) {
        toast.error(error?.response?.data?.error);
            throw error;
    }
})


export const deleteTheater = createAsyncThunk('deleteTheater',async(theaterId)=>{

    try {
        
        const response = await axiosInstance.delete(`/theater/${theaterId}`)
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }

})


export const assignMovieScreen = createAsyncThunk(
    "theater/assignMovieScreen",
    async ({ theaterId, screenId, movieId }) => {
      try {
        const response = await axiosInstance.put("/theater/assign-movie", {
          theaterId,
          screenId,
          movieId,
        });
  
        toast.success(response?.data?.message);
        return response.data.data;
      } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to assign movie");
        throw error;
      }
    }
  );
  
  // Remove Movie from Screen
  export const removeMovieFromScreen = createAsyncThunk(
    "theater/removeMovieFromScreen",
    async ({ theaterId, screenId }) => {
      try {
        const response = await axiosInstance.put("/theater/remove-movie", {
          theaterId,
          screenId,
        });
  
        toast.success(response?.data?.message);
        return response.data.data;
      } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to remove movie");
        throw error;
      }
    }
  );

  export const getTheatersByMovie = createAsyncThunk(
    'getTheatersByMovie',
    async ({ movieId }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`/theater/by-movie/${movieId}`);
        console.log(`getThearerBymovie Slice`,response);
        
        return response.data.message;
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch theaters");
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  const theaterSlice = createSlice({
    name:'theater',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
          // Create Theater
          .addCase(createtheater.pending, (state) => {
            state.loading = true;
          })
          .addCase(createtheater.fulfilled, (state, action) => {
            state.loading = false;
            state.theaters.push(action.payload);
          })
          .addCase(createtheater.rejected, (state) => {
            state.loading = false;
          })
    
          // Update Theater
          .addCase(updateTheater.pending, (state) => {
            state.loading = true;
          })
          .addCase(updateTheater.fulfilled, (state, action) => {
            state.loading = false;
            state.theaters = state.theaters.map((theater) =>
              theater._id === action.payload._id ? action.payload : theater
            );
          })
          .addCase(updateTheater.rejected, (state) => {
            state.loading = false;
          })
    
          // Get All Theaters
          .addCase(getAllTheater.pending, (state) => {
            state.loading = true;
          })
          .addCase(getAllTheater.fulfilled, (state, action) => {
            state.loading = false;
            state.theaters = action.payload;
          })
          .addCase(getAllTheater.rejected, (state) => {
            state.loading = false;
          })
    
          // Get Theater by ID
          .addCase(getTheaterById.pending, (state) => {
            state.loading = true;
          })
          .addCase(getTheaterById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedTheater = action.payload;
          })
          .addCase(getTheaterById.rejected, (state) => {
            state.loading = false;
          })
    
          // Delete Theater
          .addCase(deleteTheater.pending, (state) => {
            state.loading = true;
          })
          .addCase(deleteTheater.fulfilled, (state, action) => {
            state.loading = false;
            state.theaters = state.theaters.filter(
              (theater) => theater._id !== action.meta.arg
            );
          })
          .addCase(deleteTheater.rejected, (state) => {
            state.loading = false;
          })
    
          // Assign Movie to Screen
          .addCase(assignMovieScreen.pending, (state) => {
            state.loading = true;
          })
          .addCase(assignMovieScreen.fulfilled, (state, action) => {
            state.loading = false;
            state.theaters = state.theaters.map((theater) =>
              theater._id === action.payload._id ? action.payload : theater
            );
          })
          .addCase(assignMovieScreen.rejected, (state) => {
            state.loading = false;
          })
    
          // Remove Movie from Screen
          .addCase(removeMovieFromScreen.pending, (state) => {
            state.loading = true;
          })
          .addCase(removeMovieFromScreen.fulfilled, (state, action) => {
            state.loading = false;
            state.theaters = state.theaters.map((theater) =>
              theater._id === action.payload._id ? action.payload : theater
            );
          })
          .addCase(removeMovieFromScreen.rejected, (state) => {
            state.loading = false;
          })

          // get theater by movie 

          .addCase(getTheatersByMovie.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(getTheatersByMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTheater = action.payload;
      })
      .addCase(getTheatersByMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })




      }
  });


  export default theaterSlice.reducer
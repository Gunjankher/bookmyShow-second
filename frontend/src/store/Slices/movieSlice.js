import axiosInstance from '@/helpers/axiosInstance'
import {configureStore,createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { createAccount } from './authSlice'



const initialState ={

    loading:false,
    error:null,
    movies:[],
    movieData:null,
  


}




export const createMovie = createAsyncThunk('createMovie',async(data)=>{
    const formData = new FormData()

    formData.append("title", data.title);
    formData.append("poster", data.poster[0]);
    
    if (data.coverPoster && data.coverPoster.length > 0) {
      formData.append("coverPoster", data.coverPoster[0]); // ✅ correct field name
    } else {
      console.warn("CoverPoster file is missing!");
    }
    
    formData.append("trailer",data.trailer[0])
    formData.append('genre',data.genre)
    formData.append("releseDate",data.releseDate)
    formData.append("formats", data.formats); // String (e.g., "IMAX,3D")
    formData.append("description", data.description);
    formData.append("cast", JSON.stringify(data.cast)); // Array of actor IDs
    if (data.characters && Array.isArray(data.characters)) {
        data.characters.forEach((id) => {
          formData.append("characters", id); // 👈 this way, backend gets an array
        });
      }
      

      console.log("Characters being sent:", data.characters);
      console.log(`formdata`,formData);
      

    try {
        
        const response = await axiosInstance.post("/movie/",formData)
        console.log(`create movie slice response`,response);
        
        toast.success(response?.data?.data)
        return response?.data?.data

    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error;
    }

})


export const updateMovie = createAsyncThunk("updateMovie",
    async({movieId,data})=>{
        const formData = new FormData()
        formData.append("title",data.title)
        formData.append("genre",data.genre)
        formData.append("description",data.description)
       
        
    // 🟡 handle formats (Array)
    if (Array.isArray(data.formats)) {
        data.formats.forEach((format) => {
          formData.append("formats", format);
        });
      }
  
      // ✅ Files: extract from FileList
      if (data.poster && data.poster.length > 0) {
        formData.append("poster", data.poster[0]);
      }
  
      if (data.coverPoster && data.coverPoster.length > 0) {
        formData.append("coverPoster", data.coverPoster[0]);
      }
  
      if (data.trailer && data.trailer.length > 0) {
        formData.append("trailer", data.trailer[0]);
      }

        console.log(`data form updateSlice`,data);
        
        try {
            
            const response = await axiosInstance.patch(
                `/movie/m/${movieId}`,
                formData
            )

            toast.success(response?.data?.message)
            return response.data?.data

        } catch (error) {
            toast.error(error?.response?.data?.error)
            console.log(`updateSliceError`,error);
            
            throw error
        }
    }

)


export const deleteMovie = createAsyncThunk(
    "deleteMovie",
    async (movieId) => {
        try {
            const response = await axiosInstance.delete(`/movie/m/${movieId}`);
            toast.success(response?.data?.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);



export const getMovieById = createAsyncThunk(
    "getMovieById",
    async ({ movieId }) => {
        try {
            const response = await axiosInstance.get(`/movie/${movieId}`);
            console.log(`moviebyId Slice`,response);
            
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);


export const getAllMovies = createAsyncThunk("getAllMovies",
    async()=>{
        try {

            const response = await axiosInstance.get(`/movie/`)
            console.log(response);
            
            return response.data?.data;
        } catch (error) {
            toast.error(error?.response?.data?.error || `Failed to fetch movies`)
            throw error
        }
    }
)





const movieSlice = createSlice({
    name:"movie",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createMovie.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(createMovie.fulfilled,(state,action)=>{
            state.loading = false
            state.movies.push(action.payload)
        })
        builder.addCase(createMovie.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload; // Store error message if needed
        });

        builder.addCase(updateMovie.pending,(state)=>{
            state.loading = true
        })

        builder.addCase(updateMovie.fulfilled,(state,action)=>{
            state.loading = false,
            state.movies = state.movies.map(movie =>
                movie._id === action.payload._id ? action.payload : movie
              );
        })

        builder.addCase(updateMovie.rejected,(state)=>{
            state.loading = false
        })

         // Handle deleteMovie
    builder.addCase(deleteMovie.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(deleteMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = state.movies.filter(
            (movie) => movie._id !== action.payload._id
        ); // Remove deleted movie
    });
    builder.addCase(deleteMovie.rejected, (state) => {
        state.loading = false;
    });

    builder.addCase(getMovieById.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(getMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.movieData = action.payload; // Store the selected movie
    });
    builder.addCase(getMovieById.rejected, (state) => {
        state.loading = false;
    });

      // Handle getAllMovies
      builder.addCase(getAllMovies.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(getAllMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload || []; // Store fetched movies
    });
    builder.addCase(getAllMovies.rejected, (state) => {
        state.loading = false;
    });
    }

})


export default movieSlice.reducer
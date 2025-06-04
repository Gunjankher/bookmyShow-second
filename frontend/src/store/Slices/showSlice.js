import axiosInstance from "@/helpers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  shows: [],
  selectedShows: null,
  showByMovie: null,
  loading: false,
};

export const createShow = createAsyncThunk("createShow", async (data) => {
  const formData = new FormData();

  formData.append("screenName", data.screenName);
  formData.append("movie", data.movie);
  formData.append("startTime", data.startTime);
  formData.append("endTime", data.endTime);
  formData.append("baseTicketPrice", data.baseTicketPrice);
  formData.append("theaterId", data.theaterId);

  try {
    const response = await axiosInstance.post("/shows/", formData);
    toast.success(response?.data?.message);
    return response?.data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to create show");
    throw error;
  }
});

export const getAllShows = createAsyncThunk("getAllShows", async () => {
  try {
    const response = await axiosInstance.get("/shows/all");
    return response.data.data; // Assuming the response structure contains `data`
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to fetch shows");
    throw error;
  }
});

export const getShowById = createAsyncThunk("getShowsById", async (showId) => {
  try {
    const response = await axiosInstance.get(`/shows/${showId}`);
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Failed to fetch show details");
    throw error;
  }
});

export const deleteShow = createAsyncThunk(
  "deleteShow",
  async (showId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/shows/${showId}`);
      toast.success(response?.data?.message || "Show deleted successfully");
      return showId; // Return the deleted show's ID for updating state
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to delete show");
      return rejectWithValue(
        error.response?.data?.error || "Something went wrong"
      );
    }
  }
);

export const getShowByMovieId = createAsyncThunk(
  "getShowByMovieId",
  async (movieId) => {
    try {
      const response = await axiosInstance.get(`/shows/show/${movieId}`);
      console.log(`this is response of showbyMovie`,response);
      
      return response.data.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Failed to fetch show for movie"
      );
      throw error;
    }
  }
);

const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Show
      .addCase(createShow.pending, (state) => {
        state.loading = true;
      })
      .addCase(createShow.fulfilled, (state, action) => {
        state.loading = false;
        state.shows.push(action.payload); // Add new show to list
        toast.success("Show created successfully");
      })
      .addCase(createShow.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })

      // Get All Shows
      .addCase(getAllShows.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllShows.fulfilled, (state, action) => {
        state.loading = false;
        state.shows = action.payload; // Set the fetched shows list
      })
      .addCase(getAllShows.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })

      // Get Show By ID
      .addCase(getShowById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getShowById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedShows = action.payload; // Set the fetched show details
      })
      .addCase(getShowById.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      })

      // Delete Show
      .addCase(deleteShow.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteShow.fulfilled, (state, action) => {
        state.loading = false;
        state.shows = state.shows.filter((show) => show._id !== action.payload); // Remove deleted show
        toast.success("Show deleted successfully");
      })
      .addCase(deleteShow.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload);
      })

      // Get Show By Movie ID
      .addCase(getShowByMovieId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getShowByMovieId.fulfilled, (state, action) => {
        state.loading = false;
        state.showByMovie = action.payload;
      })
      .addCase(getShowByMovieId.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.error.message);
      });
  },
});

export default showSlice.reducer;

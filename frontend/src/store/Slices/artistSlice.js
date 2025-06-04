import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    artists: [],
    selectedArtist: null,
    loading: false,
};

// ✅ **Create Artist**
export const createArtist = createAsyncThunk("createArtist", async (data,) => {

    const formData = new FormData() 
    formData.append('name', data.name)
    formData.append('occupation', data.occupation)
    formData.append('born', data.born)
    formData.append('description', data.description)
    if (data.avatar && data.avatar.length > 0) {
        formData.append('avatar', data.avatar?.[0]); // ✅ use [0]
      } else {
        console.warn('Avatar file is missing!');
      }

       // ✅ To debug formData properly
    for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
    }
      


    try {
        const response = await axiosInstance.post("/artist/", formData, {
         
        });
        toast.success(response?.data?.message || "Artist created successfully");
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to create artist");
        return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
});



// ✅ **Get All Artists**
export const getAllArtists = createAsyncThunk("getAllArtists", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/artist/");
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to fetch artists");
        return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
});

// ✅ **Get Artist by ID**
export const getArtistById = createAsyncThunk("getArtistById", async (artistId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/artist/${artistId}`);
        console.log(`slice`,response);
        
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to fetch artist details");
        return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
});

// ✅ **Delete Artist**
export const deleteArtist = createAsyncThunk("deleteArtist", async (artistId, { rejectWithValue }) => {
    try {
        await axiosInstance.delete(`/artist/${artistId}`);
        toast.success("Artist deleted successfully");
        return artistId; // Return the deleted artist's ID for updating state
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to delete artist");
        return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
});

// ✅ **Create Artist Slice**
const artistSlice = createSlice({
    name: "artist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ Handle Create Artist
            .addCase(createArtist.pending, (state) => {
                state.loading = true;
            })
            .addCase(createArtist.fulfilled, (state, action) => {
                state.loading = false;
                state.artists.push(action.payload);
            })
            .addCase(createArtist.rejected, (state) => {
                state.loading = false;
            })

            // ✅ Handle Get All Artists
            .addCase(getAllArtists.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllArtists.fulfilled, (state, action) => {
                state.loading = false;
                state.artists = action.payload;
            })
            .addCase(getAllArtists.rejected, (state) => {
                state.loading = false;
            })

            // ✅ Handle Get Artist by ID
            .addCase(getArtistById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getArtistById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedArtist = action.payload;
            })
            .addCase(getArtistById.rejected, (state) => {
                state.loading = false;
            })

            // ✅ Handle Delete Artist
            .addCase(deleteArtist.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteArtist.fulfilled, (state, action) => {
                state.loading = false;
                state.artists = state.artists.filter(artist => artist._id !== action.payload);
            })
            .addCase(deleteArtist.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default artistSlice.reducer;

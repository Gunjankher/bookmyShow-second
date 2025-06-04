import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    characters: [],
    selectedCharacter: null,
    loading: false,
};

// ✅ **Create Character**
export const createCharacter = createAsyncThunk("createCharacter", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/character/", data);
        toast.success(response?.data?.message || "Character created successfully");
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to create character");
        return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
});

// ✅ **Get All Characters**
export const getAllCharacters = createAsyncThunk("getAllCharacters", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/character/");
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to fetch characters");
        return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
});

// ✅ **Get Character by ID**
export const getCharacterById = createAsyncThunk("getCharacterById", async (characterId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/character/${characterId}`);
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to fetch character details");
        return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
});

// ✅ **Update Character**
export const updateCharacter = createAsyncThunk("updateCharacter", async ({ characterId, data }, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`/character/${characterId}`, data);
        toast.success(response?.data?.message || "Character updated successfully");
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to update character");
        return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
});

// ✅ **Delete Character**
export const deleteCharacter = createAsyncThunk("deleteCharacter", async (characterId, { rejectWithValue }) => {
    try {
        await axiosInstance.delete(`/character/${characterId}`);
        toast.success("Character deleted successfully");
        return characterId;
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to delete character");
        return rejectWithValue(error.response?.data?.error || "Something went wrong");
    }
});

// ✅ **Create Character Slice**
const characterSlice = createSlice({
    name: "character",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ Create Character
            .addCase(createCharacter.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCharacter.fulfilled, (state, action) => {
                state.loading = false;
                state.characters.push(action.payload);
            })
            .addCase(createCharacter.rejected, (state) => {
                state.loading = false;
            })

            // ✅ Get All Characters
            .addCase(getAllCharacters.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCharacters.fulfilled, (state, action) => {
                state.loading = false;
                state.characters = action.payload;
            })
            .addCase(getAllCharacters.rejected, (state) => {
                state.loading = false;
            })

            // ✅ Get Character by ID
            .addCase(getCharacterById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCharacterById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCharacter = action.payload;
            })
            .addCase(getCharacterById.rejected, (state) => {
                state.loading = false;
            })

            // ✅ Update Character
            .addCase(updateCharacter.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCharacter.fulfilled, (state, action) => {
                state.loading = false;
                state.characters = state.characters.map(character =>
                    character._id === action.payload._id ? action.payload : character
                );
            })
            .addCase(updateCharacter.rejected, (state) => {
                state.loading = false;
            })

            // ✅ Delete Character
            .addCase(deleteCharacter.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCharacter.fulfilled, (state, action) => {
                state.loading = false;
                state.characters = state.characters.filter(character => character._id !== action.payload);
            })
            .addCase(deleteCharacter.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default characterSlice.reducer;

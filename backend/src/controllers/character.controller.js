import { Character } from "../models/characters.model.js";
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { asyncHandlar } from "../utilis/asyncHandlar.js";



// ✅ Create Character
export const createCharacter = asyncHandlar(async (req, res, next) => {
    const { name, description, playedBy } = req.body;

    const newCharacter = await Character.create({ name, description, playedBy });

    res.status(201).json(new ApiResponse(201, newCharacter, "Character created successfully"));
});

// ✅ Get All Characters
export const getAllCharacters = asyncHandlar(async (req, res, next) => {
    const characters = await Character.find().populate("playedBy", "name occupation");
    res.status(200).json(new ApiResponse(200, characters, "All characters fetched"));
});

// ✅ Get Character by ID
export const getCharacterById = asyncHandlar(async (req, res, next) => {
    const character = await Character.findById(req.params.id).populate("playedBy", "name occupation");
    if (!character) return next(new ApiError(404, "Character not found"));

    res.status(200).json(new ApiResponse(200, character, "Character fetched successfully"));
});

// ✅ Update Character
export const updateCharacter = asyncHandlar(async (req, res, next) => {
    const updatedCharacter = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCharacter) return next(new ApiError(404, "Character not found"));

    res.status(200).json(new ApiResponse(200, updatedCharacter, "Character updated successfully"));
});

// ✅ Delete Character
export const deleteCharacter = asyncHandlar(async (req, res, next) => {
    const deletedCharacter = await Character.findByIdAndDelete(req.params.id);
    if (!deletedCharacter) return next(new ApiError(404, "Character not found"));

    res.status(200).json(new ApiResponse(200, deletedCharacter, "Character deleted successfully"));
});
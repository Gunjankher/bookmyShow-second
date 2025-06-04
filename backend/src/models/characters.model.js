import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., "Iron Man"
    description: { type: String }, 
    playedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Artist", 
        required: true 
    }  // Link to artist
});

export const Character = mongoose.model("Character", characterSchema);

import mongoose, { Schema } from "mongoose";



const artistSchema= new Schema({

name:{
    type:String,
    required:true
},
occupation:{
    type:[String],
    default:['Actor']
},
born:{
    type:Date,
},
avatar:{
type:String,
},

description:{
    type:String,
    default:`he is an actor`
}
})


export const Artist = mongoose.model("Artist",artistSchema)



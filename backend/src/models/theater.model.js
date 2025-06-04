import mongoose, { Schema } from 'mongoose'
import { type } from 'os'





const theaterSchema = new Schema({

name:{
    type:String,
    required:true
},
location:{
    type:String,
    required:true
},
capacity:{
    type:Number,
    required:true
},
facilities:[String],

owner:{
    type:mongoose.Types.ObjectId,
    ref:"Admin"
},

screens:[
    {
        name: { type: String, required: true }, // E.g., 'Screen 1'
        format: { type: String, enum: ['2D', '3D', 'IMAX'], required: true },
        totalSeats: { type: Number, required: true },
        movie:{type:mongoose.Schema.Types.ObjectId, ref:'Movie'}
      }, 
]

})



export const Theater = mongoose.model("Theater",theaterSchema)
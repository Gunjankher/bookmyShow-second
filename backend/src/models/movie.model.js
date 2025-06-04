import mongoose, { Schema } from 'mongoose'



const movieSchema = new Schema({

title:{
    type:String,
    required:true
},

genre:{
    type:String,
    required:true
},

releseDate:{
    type:Date,
    // required:true
},

formats:{
    type:[String],
    enum:['2D','3D','IMAX'],
    default :['2D']
},
numOfRatings:{
    type:Number,
    default:0
},

description:{
type:String,
required:true
},

poster:{
    type: {
        url: String,
        public_id: String,
    },
    required:true,
},
coverPoster:{
    type: {
        url: String,
        public_id: String,
    },
    required:true
},
trailer:{
    type:{
        url:String,
        public_id:String
    },
    // required:true
},

cast:{
    type:mongoose.Types.ObjectId,
    ref:'Artist'
},

owner:{
     type:mongoose.Types.ObjectId,
    ref:'Admin'
},

characters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Character",
    validate: {
      validator: function (v) {
        return mongoose.Types.ObjectId.isValid(v);
      },
      message: props => `${props.value} is not a valid character ID!`
    }
  }],
theater: { type: mongoose.Schema.Types.ObjectId, ref: "Theater" }

})


export const Movie = mongoose.model("Movie",movieSchema)
import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const showSchema = new Schema({
  theater: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Theater', 
    required: true 
  },
  screenName: { 
    type: String, 
    required: true 
  }, // Must match a screen name in the Theater model
  movie: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Movie', 
    required: true 
  },
  startTime: { 
    type: Date, 
    required: true 
  },
  endTime: { 
    type: Date, 
    required: true 
  },
  // format: { 
  //   type: String, 
  //   enum: ['2D', '3D', 'IMAX'], 
  //   required: true 
  // },
  // ticketPrice: { 
  //   type: Number, 
  //   required: true 
  // },
  

 // 👇 The seats array will hold all individual seats
 seats: [
  {
    row: { type: String, required: true },
    number: { type: Number, required: true },
    category: { type: String, enum: ["Gold", "Silver", "Platinum"], required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ["Available", "Booked", "Reserved"], default: "Available" },
  }
]

}, { timestamps: true, toJSON:{virtuals:true}, toObject:{virtuals:true}});




// 🔥 Virtual Property to Auto-Calculate Total Seats
showSchema.virtual("totalSeats").get(function () {
  return this.seats.length; // 👉 Total seats = number of seat objects in array
});

// 🔥 Virtual Property to Auto-Calculate Available Seats
showSchema.virtual("availableSeats").get(function () {
  return this.seats.filter(seat => seat.status === "Available").length;
});


showSchema.plugin(mongooseAggregatePaginate)

export const Show = mongoose.model('Show', showSchema);

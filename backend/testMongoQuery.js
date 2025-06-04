// import { MongoClient, ObjectId } from "mongodb";


// async function testQuery() {
//     const uri = "mongodb+srv://gunjan:Gunjan2001@gunjan2001.t1hro.mongodb.net"; // Replace with your MongoDB connection string
//     const client = new MongoClient(uri);

//     try {
//         await client.connect();
//         const db = client.db("bookmyShow"); // Replace with your actual database name

//         const theater = await db.collection("theaters").findOne({ _id: new ObjectId("6798ad659141a1b5374df58a") });
//         console.log("Theater:", theater);

//         const movie = await db.collection("movies").findOne({ _id: new ObjectId("6793608f049051cec23b15b9") });
//         console.log("Movie:", movie);

//     } catch (error) {
//         console.error("Error:", error);
//     } finally {
//         await client.close();
//     }
// }

// testQuery();



import mongoose from "mongoose";
import { Show } from "./src/models/show.model.js"; // Your actual Show model path

export const testAggregation = async (req, res) => {
  try {
    const { id } = req.params; // Get the show ID from URL params
    if (!id) {
      return res.status(400).json({ message: "Show ID is required" });
    }

    const populatedShow = await Show.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Matching the show ID
      {
        $lookup: {
          from: "theaters", // Collection name
          localField: "theater",
          foreignField: "_id",
          as: "theater",
        },
      },
      { $unwind: "$theater" }, // Flatten the theater array into an object
      {
        $lookup: {
          from: "movies", // Collection name
          localField: "movie",
          foreignField: "_id",
          as: "movie",
        },
      },
      { $unwind: "$movie" }, // Flatten the movie array into an object
      {
        $project: {
          _id: 1,
          screenName: 1,
          startTime: 1,
          endTime: 1,
          format: 1,
          ticketPrice: 1,
          availableSeats: 1,
          totalSeats: 1,
          createdAt: 1,
          "theater._id": 1,
          "theater.name": 1,
          "theater.location": 1,
          "theater.capacity": 1,
          "theater.facilities": 1,
          "movie._id": 1,
          "movie.title": 1,
          "movie.genre": 1,
        },
      },
    ]);

    console.log("Aggregation Result:", populatedShow); // Log for debugging

    if (populatedShow.length === 0) {
      return res.status(404).json({ message: "No show found" });
    }

    return res.status(200).json(populatedShow);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Aggregation failed" });
  }
};


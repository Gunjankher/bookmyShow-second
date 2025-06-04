import React from "react";

function ShowDetails({ show }) {
  if (!show) return <p>Loading show details...</p>;

  const {
    movie,
    screenName,
    theater,
    startTime,
    endTime,
    availableSeats,
    totalSeats,
    seats,
    createdAt,
    updatedAt,
  } = show;

  const formatDateTime = (dateString) =>
    new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="p-8 bg-white text-gray-800 rounded-2xl shadow-xl space-y-8 max-w-4xl mx-auto">
      {/* 🎬 Movie Info */}
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-pink-600">🎬 Movie</h2>
        <p><strong className="text-pink-500">Title:</strong> {movie?.title}</p>
        <p><strong className="text-pink-500">Genre:</strong> {movie?.genre}</p>
      </div>

      {/* 🛋️ Theater Info */}
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-pink-600">🏢 Theater</h2>
        <p><strong className="text-pink-500">Name:</strong> {theater?.name}</p>
        <p><strong className="text-pink-500">Location:</strong> {theater?.location}</p>
        <p><strong className="text-pink-500">Capacity:</strong> {theater?.capacity}</p>
        <p><strong className="text-pink-500">Facilities:</strong> {theater?.facilities?.join(", ")}</p>
        <p><strong className="text-pink-500">Screen Name:</strong> {screenName}</p>
      </div>

      {/* 🕒 Timings */}
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-pink-600">🕒 Timings</h2>
        <p><strong className="text-pink-500">Start Time:</strong> {formatDateTime(startTime)}</p>
        <p><strong className="text-pink-500">End Time:</strong> {formatDateTime(endTime)}</p>
      </div>

      {/* 🪑 Seats */}
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-pink-600">🪑 Seats</h2>
        <p><strong className="text-pink-500">Total Seats:</strong> {totalSeats}</p>
        <p><strong className="text-pink-500">Available Seats:</strong> {availableSeats}</p>
        <p><strong className="text-pink-500">Seat Count in System:</strong> {seats?.length}</p>
      </div>

      {/* 🔄 Metadata */}
      <div className="text-sm text-gray-500 space-y-2">
        <p><strong className="text-pink-500">Created At:</strong> {formatDateTime(createdAt)}</p>
        <p><strong className="text-pink-500">Last Updated:</strong> {formatDateTime(updatedAt)}</p>
      </div>
    </div>
  );
}

export default ShowDetails;

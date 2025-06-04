import { deleteTheater, getAllTheater, getTheaterById } from '@/store/Slices/theaterSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Edit2, Trash2, Film, CalendarPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Theaters() {
  const theater = useSelector((state) => state.theater.theaters);
  const theaterById = useSelector((state) => state.theater.selectedTheater);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllTheater());
  }, [dispatch]);

  const handleAddTheater = () => {
    console.log("Add Theater clicked");
    navigate(`/admin/theaters/create`);
  };

  const handleEdit = (id) => {
    console.log("Edit Theater:", id);
    navigate(`/admin/theaters/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this theater?")) {
      dispatch(deleteTheater(id))
        .then(() => {
          toast.success("Theater deleted successfully!");
        })
        .catch((error) => {
          toast.error("Error deleting theater.");
        });
    }
  };

  const handleAssignMovie = (id) => {
    console.log("Assign Movie to Theater:", id);
    navigate(`/admin/theaters/assign/${id}`);
  };

  const handleCreateShow = (id) => {
    console.log("Create Show for Theater:", id);
    navigate(`/admin/theaters/show/create/${id}`);
  };

  return (
    <div className="p-6 text-gray-900 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-pink-600">🎭 All Theaters</h1>
        <button
          onClick={handleAddTheater}
          className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg shadow text-white"
        >
          <Plus size={20} /> Add Theater
        </button>
      </div>

      {theater && theater.length > 0 ? (
        theater.map((t) => (
          <div
            key={t._id}
            className="bg-gray-200 p-6 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-start gap-6"
          >
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-pink-600">{t.name}</h2>
              <p className="text-gray-500 mb-1">📍 {t.location}</p>
              <p className="mb-2">🪑 Capacity: {t.capacity}</p>

              <div className="mb-2">
                <p className="font-semibold text-pink-500">🎁 Facilities:</p>
                <ul className="list-disc list-inside text-sm text-gray-500">
                  {t.facilities.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-2">
                <p className="font-semibold text-pink-500">🖥️ Screens:</p>
                <ul className="text-sm text-gray-500">
                  {t.screens.map((screen) => (
                    <li key={screen._id}>
                      • {screen.name} ({screen.format}) - {screen.totalSeats} seats
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-start gap-3">
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(t._id)}
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-500"
                >
                  <Edit2 size={18} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="flex items-center gap-1 text-red-400 hover:text-red-500"
                >
                  <Trash2 size={18} /> Delete
                </button>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleAssignMovie(t._id)}
                  className="flex items-center gap-1 text-yellow-400 hover:text-yellow-500 cursor-pointer"
                >
                  <Film size={18} /> Assign Movie
                </button>
                <button
                  onClick={() => handleCreateShow(t._id)}
                  className="flex items-center gap-1 text-green-400 hover:text-green-500 cursor-pointer"
                >
                  <CalendarPlus size={18} /> Create Show
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No theaters found.</p>
      )}
    </div>
  );
}

export default Theaters;

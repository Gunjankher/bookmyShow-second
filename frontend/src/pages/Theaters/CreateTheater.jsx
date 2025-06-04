import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createtheater } from "@/store/Slices/theaterSlice";
import { useNavigate } from "react-router-dom";


function CreateTheater() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [facilities, setFacilities] = useState([]);
  const [screens, setScreens] = useState([{ name: "", format: "", totalSeats: "" }]);
  const admin = useSelector((state) => state.auth.adminData); // Or whatever slice holds the logged-in user
  const navigate = useNavigate()


  const onSubmit = (data) => {
    const finalData = {
      ...data,
      owner: admin?._id,
      facilities,
      screens,
    };

    dispatch(createtheater(finalData)).unwrap().then(() => {
      reset();
      setFacilities([]);
      setScreens([{ name: "", format: "", totalSeats: "" }]);
    });
    navigate("/admin/theaters");
  };

  const handleFacilityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFacilities([...facilities, value]);
    } else {
      setFacilities(facilities.filter((f) => f !== value));
    }
  };

  const handleScreenChange = (index, key, value) => {
    const updatedScreens = [...screens];
    updatedScreens[index][key] = value;
    setScreens(updatedScreens);
  };

  const addScreen = () => {
    setScreens([...screens, { name: "", format: "", totalSeats: "" }]);
  };

  



  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 text-white p-4 max-w-2xl mx-auto"
    >
      <h1 className="text-2xl font-bold">Create Theater</h1>

      <div>
        <label>Name</label>
        <input {...register("name")} className="w-full p-2 bg-gray-700 rounded text-white" />
      </div>

      <div>
        <label>Location</label>
        <input {...register("location")} className="w-full p-2 bg-gray-700 rounded text-white" />
      </div>

      <div>
        <label>Capacity</label>
        <input
          type="number"
          {...register("capacity")}
          className="w-full p-2 bg-gray-700 rounded text-white"
        />
      </div>

      <div>
        <label>Facilities</label>
        <div className="space-x-4">
          {["AC", "Dolby Sound", "Wheelchair Access", "Parking"].map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                value={item}
                onChange={handleFacilityChange}
                className="mr-1"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-2">Screens</label>
        {screens.map((screen, index) => (
          <div key={index} className="space-y-2 mb-4 border p-3 rounded bg-gray-800">
            <input
              placeholder="Name"
              value={screen.name}
              onChange={(e) => handleScreenChange(index, "name", e.target.value)}
              className="w-full p-2 bg-gray-700 rounded text-white"
            />
            <input
              placeholder="Format (e.g. 2D, 3D)"
              value={screen.format}
              onChange={(e) => handleScreenChange(index, "format", e.target.value)}
              className="w-full p-2 bg-gray-700 rounded text-white"
            />
            <input
              type="number"
              placeholder="Total Seats"
              value={screen.totalSeats}
              onChange={(e) => handleScreenChange(index, "totalSeats", e.target.value)}
              className="w-full p-2 bg-gray-700 rounded text-white"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addScreen}
          className="bg-blue-600 px-4 py-2 rounded mt-2"
        >
          + Add Screen
        </button>
      </div>

      <button type="submit" className="bg-purple-600 px-4 py-2 rounded">
        Create Theater
      </button>
    </form>
  );
}

export default CreateTheater;

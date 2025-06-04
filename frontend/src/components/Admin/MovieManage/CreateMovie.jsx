import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createMovie } from '../../../store/Slices/movieSlice';
import GetImagePreview from './../../GetImagePreview';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllArtists } from '@/store/Slices/artistSlice';
import { createCharacter } from '@/store/Slices/characterSlice';

function CreateMovie() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      characters: []
    }
  });

  const dispatch = useDispatch();
  const artist = useSelector((state) => state.artist.artists);
  const navigate = useNavigate();

  const [castFields, setCastFields] = useState([{ actorId: '', characterName: '' }]);
  const [isLoading, setIsLoading] = useState(false); // loading state

  useEffect(() => {
    dispatch(getAllArtists());
  }, [dispatch]);

  const handleCastChange = (index, field, value) => {
    const updatedCast = [...castFields];
    updatedCast[index][field] = value;
    setCastFields(updatedCast);
  };

  const addMoreCast = () => {
    setCastFields([...castFields, { actorId: '', characterName: '' }]);
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const createdCharacters = [];

      for (const cast of castFields) {
        if (!cast.actorId || !cast.characterName) continue;

        const res = await dispatch(
          createCharacter({
            name: cast.characterName,
            playedBy: cast.actorId
          })
        );

        if (res?.payload?._id) {
          createdCharacters.push(res.payload._id);
        }
      }

      const finalMovieData = {
        ...data,
        characters: createdCharacters
      };

      await dispatch(createMovie(finalMovieData));
      navigate('/admin/movieManage');
    } catch (err) {
      console.error("Movie creation failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto bg-white text-gray-800 shadow-lg rounded-xl p-8 space-y-6"
    >
      <h2 className="text-3xl font-bold text-center">🎬 Create New Movie</h2>

      {/* Title */}
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          {...register('title', { required: 'Title is required' })}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      {/* Genre */}
      <div>
        <label className="block font-semibold mb-1">Genre</label>
        <input
          type="text"
          {...register('genre', { required: 'Genre is required' })}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
        {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}
      </div>

      {/* Release Date */}
      <div>
        <label className="block font-semibold mb-1">Release Date</label>
        <input
          type="date"
          {...register('releseDate', { required: 'Release date is required' })}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
        {errors.releseDate && <p className="text-red-500 text-sm">{errors.releseDate.message}</p>}
      </div>

      {/* Formats */}
      <div>
        <label className="block font-semibold mb-1">Formats</label>
        <select
          multiple
          {...register('formats', { required: 'At least one format is required' })}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        >
          <option value="IMAX">IMAX</option>
          <option value="3D">3D</option>
          <option value="2D">2D</option>
        </select>
        {errors.formats && <p className="text-red-500 text-sm">{errors.formats.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          className="w-full border border-gray-300 rounded-md px-4 py-2 min-h-[100px] focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      {/* Poster Image */}
      <GetImagePreview
        name="poster"
        control={control}
        label="Poster Image"
        className="w-full h-64 object-cover rounded-lg"
        cameraIcon={true}
      />

      {/* Cover Poster */}
      <GetImagePreview
        name="coverPoster"
        control={control}
        label="Cover Poster"
        className="w-full h-64 object-cover rounded-lg"
        cameraIcon={true}
      />

      {/* Trailer File */}
      <div>
        <label className="block font-semibold mb-1">Trailer (video)</label>
        <Controller
          name="trailer"
          control={control}
          defaultValue=""
          render={({ field: { onChange } }) => (
            <input
              type="file"
              accept="video/*"
              onChange={(e) => onChange(e.target.files)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none text-gray-700"
            />
          )}
          rules={{ required: 'Trailer is required' }}
        />
        {errors.trailer && <p className="text-red-500 text-sm">{errors.trailer.message}</p>}
      </div>

      {/* Cast Fields */}
      <div>
        <label className="block font-semibold mb-2">Cast (Actor + Character)</label>
        <div className="space-y-4">
          {castFields.map((cast, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Actor</label>
                <select
                  value={cast.actorId}
                  onChange={(e) => handleCastChange(index, 'actorId', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="">Select Artist</option>
                  {artist?.map((a) => (
                    <option key={a._id} value={a._id}>{a.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Character Name</label>
                <input
                  type="text"
                  value={cast.characterName}
                  onChange={(e) => handleCastChange(index, 'characterName', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addMoreCast}
          className="mt-3 text-sm text-purple-700 font-medium hover:underline"
        >
          + Add More Cast
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 
          ${isLoading ? "bg-purple-400 animate-bounce cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
      >
        {isLoading ? "🎬 Creating..." : "Create Movie"}
      </button>
    </form>
  );
}

export default CreateMovie;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { getMovieById, updateMovie } from '../../../store/Slices/movieSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllArtists } from '@/store/Slices/artistSlice';
import GetImagePreview from './../../GetImagePreview';

function EditMovie() {
    const { movieId } = useParams();
    const dispatch = useDispatch();
    const artist = useSelector((state) => state.artist.artists);
    const movieData = useSelector((state) => state.movie.movieData);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm();

    useEffect(() => {
        dispatch(getMovieById({ movieId }));
        dispatch(getAllArtists());
    }, [dispatch]);

    useEffect(() => {
        if (movieData && Object.keys(movieData).length > 0) {
          reset({
            title: movieData.title || '',
            genre: movieData.genre || '',
            releseDate: movieData.releseDate?.slice(0, 10) || '',
            formats: movieData.formats || [],
            description: movieData.description || '',
            poster: movieData.poster || [], // <-- include poster
            coverPoster: movieData.coverPoster || [], // <-- include coverPoster
          });
        }
      }, [movieData, reset]);
      

    const onSubmit = async (data) => {
        await dispatch(updateMovie({ movieId, data }));
        navigate("/admin/movieManage");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-4xl mx-auto bg-white text-gray-800 shadow-xl p-10 rounded-lg space-y-6"
        >
            <h2 className="text-3xl font-bold border-b pb-4 mb-6">Edit Movie</h2>

            {/* Title */}
            <div>
                <label className="block font-semibold mb-1">Title</label>
                <input
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* Genre */}
            <div>
                <label className="block font-semibold mb-1">Genre</label>
                <input
                    type="text"
                    {...register('genre', { required: 'Genre is required' })}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>}
            </div>

            {/* Release Date */}
            <div>
                <label className="block font-semibold mb-1">Release Date</label>
                <input
                    type="date"
                    {...register('releseDate', { required: 'Release date is required' })}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.releseDate && <p className="text-red-500 text-sm mt-1">{errors.releseDate.message}</p>}
            </div>

            {/* Formats */}
            <div>
                <label className="block font-semibold mb-1">Formats</label>
                <select
                    multiple
                    {...register('formats', { required: 'At least one format is required' })}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="IMAX">IMAX</option>
                    <option value="3D">3D</option>
                    <option value="2D">2D</option>
                </select>
                {errors.formats && <p className="text-red-500 text-sm mt-1">{errors.formats.message}</p>}
            </div>

            {/* Description */}
            <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                    {...register('description', { required: 'Description is required' })}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows="4"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            {/* Poster Image */}
            <GetImagePreview
                name="poster"
                control={control}
                label="Poster Image"
                className="w-full h-64 object-cover rounded-lg"
                cameraIcon={true}
                defaultImage={movieData?.poster?.[0]?.url}
            />

            {/* Cover Poster */}
            <GetImagePreview
                name="coverPoster"
                control={control}
                label="Cover Poster"
                className="w-full h-64 object-cover rounded-lg"
                cameraIcon={true}
                defaultImage={movieData?.coverPoster?.[0]?.url}
            />

            {/* Trailer */}
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
                            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                        />
                    )}
                    rules={{ required: 'Trailer is required' }}
                />
                {errors.trailer && <p className="text-red-500 text-sm mt-1">{errors.trailer.message}</p>}
            </div>

            <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
                Update Movie
            </button>
        </form>
    );
}

export default EditMovie;

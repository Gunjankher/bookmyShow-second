import React from 'react';
import { useNavigate } from 'react-router-dom';

function MovieVerticalCard({
  coverImg,
  poster,
  title,
  genre,
  releaseDate,
  format,
  language,
  movieId
}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="w-full flex justify-center text-white">
      <div className="w-[90%] relative flex justify-center items-center border-2 rounded overflow-hidden">
        {/* Cover Image */}
        <img src={coverImg} alt="cover" className="w-full h-auto sm:opacity-40 object-cover" />

        {/* Poster (Desktop Only) */}
        <img
          src={poster}
          alt="poster"
          className="absolute bottom-[28px] left-[128px] transform -translate-x-1/2 w-[180px] sm:w-[200px] md:w-[210px] lg:w-[223px] h-auto max-h-[88%] rounded-xl shadow-lg hidden sm:block"
        />

        {/* Desktop Info */}
        <div className="hidden sm:block absolute left-[260px] bottom-[50px] space-y-4">
          <h1 className="text-3xl font-bold">{title}</h1>

          <div className="flex gap-2">
            <button className="px-3 py-1 border text-black bg-white hover:underline">{format}</button>
            <button className="px-3 py-1 border text-black bg-white hover:underline">{language}</button>
          </div>

          <div className="flex gap-4 text-sm">
            <span className="pl-2 list-disc">{genre}</span>
            <span className="pl-2 list-disc">{releaseDate}</span>
          </div>

          <button
            onClick={handleClick}
            className="border-2 border-white w-[160px] h-[45px] bg-red-700 rounded hover:underline"
          >
            See More
          </button>
        </div>

        {/* Mobile Info */}
        <div className="block sm:hidden absolute inset-0 flex flex-col items-center justify-end px-4 pb-8 space-y-2 text-center">
          <h1 className="text-xl font-bold break-words">{title}</h1>

          <div className="flex gap-2 flex-wrap justify-center">
            <button className="w-20 border text-black bg-white hover:underline">{format}</button>
            <button className="w-20 border text-black bg-white hover:underline">{language}</button>
          </div>

          <div className="flex gap-2 text-sm justify-center flex-wrap">
            <span>{genre}</span>
            <span>{releaseDate}</span>
          </div>

          <button
            onClick={handleClick}
            className="border-2 border-white w-[160px] h-[45px] bg-red-700 rounded hover:underline"
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieVerticalCard;

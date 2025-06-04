import React from 'react';

function MovieDetailCard({
  coverImg,
  poster,
  title,
  genre,
  releaseDate,
  format,
  language,
  onBookShow
}) {
  return (
    <div className='text-white w-full flex justify-center mt-10'>
      <div className='w-[95%] border-2 border-black flex flex-col sm:flex-row relative overflow-hidden'>

        {/* Background Cover Image */}
        <div className='relative w-full'>
          <img 
            src={coverImg} 
            alt="cover" 
            className='w-full h-[300px] sm:h-[450px] object-cover block opacity-100 sm:opacity-40' 
          />

          {/* Movie Info */}
          <div className='absolute top-0 left-0 w-full h-full flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start sm:pl-[280px] sm:pt-[80px] p-4'>

            {/* Poster on larger screens */}
            <img 
              src={poster} 
              alt="poster"
              className='hidden sm:block absolute bottom-0 left-[10%] transform -translate-x-1/2 w-[150px] sm:w-[200px] h-[70%] sm:h-[90%] rounded-xl shadow-lg' 
            />

            <div className='text-center sm:text-left space-y-4 max-w-md w-full'>
              <h1 className='text-2xl sm:text-4xl font-bold text-black'>{title}</h1>

              {/* Buttons for format and language */}
              <div className='flex flex-wrap justify-center sm:justify-start gap-2'>
                <button className='px-3 py-1 border text-black bg-white hover:underline'>{format}</button>
                <button className='px-3 py-1 border text-black bg-white hover:underline'>{language || "Hindi"}</button>
              </div>

              {/* Genre and Release Date */}
              <div className='flex flex-wrap justify-center sm:justify-start gap-4 text-sm sm:text-base'>
                <span className='pl-5 text-black'>{genre}</span>
                <span className='list-item list-disc pl-5 text-white'>{releaseDate}</span>
              </div>

              {/* Book Ticket Button */}
              <div className='flex justify-center sm:justify-start'>
                <button
                  onClick={onBookShow}
                  className='mt-4 border-2 border-white w-[140px] sm:w-[160px] h-[45px] bg-red-700 rounded hover:underline'>
                  Book Ticket
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MovieDetailCard;

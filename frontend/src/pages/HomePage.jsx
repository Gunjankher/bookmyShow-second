import MovieCard from '@/components/MovieCard'
import React from 'react'
import CorouselList from '@/components/CorouselList'
import { useDispatch, useSelector } from 'react-redux'
import Container from '@/components/Container'
import { useEffect } from 'react'
import { getAllMovies } from '@/store/Slices/movieSlice'
import { Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination, Autoplay, Scrollbar,FreeMode} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useNavigate } from 'react-router-dom'
import { getAllTheater } from '@/store/Slices/theaterSlice'
import { getAllShows } from '@/store/Slices/showSlice'




const img = 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC4xLzEwICA4OS42SyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00305698-jquqhbdnvv-portrait.jpg'

function HomePage() {

    const dispatch = useDispatch()
    const movie = useSelector((state)=>state.movie?.movies)
    const loading = useSelector((state)=>state.movie?.loading)
    const shows = useSelector((state)=>state.show?.shows)
    const navigate = useNavigate()




    useEffect(()=>{
        dispatch(getAllMovies())
    },[dispatch])
    
    useEffect(() => {
        console.log("Fetched Movies:", movie); // ✅ LOG MOVIES AFTER FETCH
    }, [movie]);

    useEffect(()=>{
        dispatch(getAllShows())
    },[dispatch])
    
    useEffect(() => {
        console.log("Fetched Shows:", shows); // ✅ LOG MOVIES AFTER FETCH
    }, [shows]);

  return (
   <>
    <div className='w-full flex flex-col items-center justify-center sm:overflow-x-hidden '>
       
<Container>

<div className="w-full max-w-[1305px] h-[300px] sm:h-[400px] md:h-[500px] mx-auto flex items-center justify-center px-4 md:px-10 my-5 ">
  <Swiper
    navigation={true}
    pagination={{ clickable: true }}
    autoplay={{ delay: 2500, disableOnInteraction: false }}
    modules={[Navigation, Pagination, Scrollbar, Autoplay]}
    loop={true}
    className="w-full h-full"
  >
    {movie?.map((movie) => (
      <SwiperSlide
        key={movie.poster?.url}
        className="flex justify-center items-center cursor-pointer"
        onClick={() => navigate(`/movie/${movie._id}`)}
      >
        <img
          src={movie.coverPoster?.url}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full rounded-lg object-cover"
        />
      </SwiperSlide>
    ))}
  </Swiper>
</div>



                        {/* movieCard */}


<div>

<div className='text-black p-10 text-4xl w-[80%]  bg-pink-400 mb-15 h-1 rounded-4xl flex items-center mx-auto justify-center animate-pulse'>
    <p className='animate-bounce'>Movies</p>
</div>

<div className="w-full overflow-x-auto">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, FreeMode]}
          freeMode={true}
          grabCursor={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          slidesPerView={"auto"}
          spaceBetween={20}
          loop={false}
          className="w-full max-w-[1300px] overflow-visible"
        >
          {movie?.map((movie) => (
            <SwiperSlide
              key={movie._id}
              className="!w-[250px] flex-shrink-0"
              onClick={() => navigate(`/movie/${movie._id}`)}
            >
              <MovieCard
                poster={movie.poster.url}
                title={movie.title}
                genre={movie.genre}
                formats={movie.formats}
                movieId={movie._id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Center pagination */}
      <style jsx>{`
        .swiper-pagination {
          text-align: center !important;
          margin-top: 20px;
        }
      `}</style>
    

</div>
</Container>

   </div>


   </>

    

  )
}

export default HomePage




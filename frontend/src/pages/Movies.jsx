import MovieVerticalCard from '@/components/MovieVerticalCard'
import { getAllMovies } from '@/store/Slices/movieSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import LoginSkeleton from '@/skeleton/LoginSkeleton'
import { getTheatersByMovie } from '@/store/Slices/theaterSlice'




const coverImg = "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/sikandar-et00394804-1742968262.jpg"
const poster = 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/sikandar-et00394804-1742968262.jpg'

function Movies() {

  const movie = useSelector((state)=>state.movie?.movies)
  const loading = useSelector((state)=>state.movie?.loading)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theaterByMovie  = useSelector((state)=>state?.theater?.theaters)


  useEffect(()=>{
    dispatch(getTheatersByMovie())
},[dispatch])

useEffect(() => {
    console.log("Theater by movie:", theaterByMovie); // ✅ LOG MOVIES AFTER FETCH
}, [theaterByMovie]);




  useEffect(()=>{
      dispatch(getAllMovies())
  },[dispatch])
  
  useEffect(() => {
      console.log("Fetched Movies:", movie); // ✅ LOG MOVIES AFTER FETCH
  }, [movie]);


  return (

    <div className='overflow-y-scroll scroll-auto h-screen'>
    <div className="w-full my-22 flex flex-col items-center justify-center border-2  text-white gap-10">
  
{
  movie?.map((movie)=>(
    
    <MovieVerticalCard
    key={movie._id}
    title={movie?.title} 
    poster={movie.poster?.url}
    coverImg={movie.coverPoster?.url}
    format={movie.formats}
    language={"Hindi"}
    genre={movie.genre}
    releaseDate={movie.releaseDate}
    movieId={movie._id}
    />
  ))
}

    </div>
 
    </div>

 )
}

export default Movies
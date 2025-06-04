import MovieCard from '@/components/MovieCard'
import CastAndCrew from '@/components/MovieDetails/CastAndCrew'
import MovieDetailCard from '@/components/MovieDetails/MovieDetailCard'
import { getMovieById } from '@/store/Slices/movieSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'





function MovieDetail(){


const stockDes = ['In a world where every choice shapes destiny, one individual embarks on an unforgettable journey filled with challenges, triumphs, and unexpected twists. As the stakes rise, relationships are tested, secrets unravel, and truths come to light — all leading to a gripping climax that will leave audiences breathless. With stunning visuals, powerful performances, and a story that resonates long after the credits roll, this film delivers a cinematic experience like no other.']

    
    const { movieId} = useParams() 
    console.log(`paramid`,movieId);
    
    const  movieById  =  useSelector((state)=> state?.movie?.movieData)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getMovieById({movieId}))
    },[dispatch])

    useEffect(()=>{
        console.log(`moviebyID`,movieById);
        
    },[movieById])

    const navigate = useNavigate()


    const gotoShowPage = ()=>{
      navigate(`/show/${movieId}`)
    }
    

  return (
    <div className='w-full'>
      <div className="w-full min-h-screen gap- flex flex-col items-center justify-center overflow-hidden overflow-y-hidden border-2 border-amber-200 text-white">

{movieById && (
    <MovieDetailCard 
      coverImg={movieById.coverPoster?.url}
      poster={movieById.poster?.url}
      title={movieById.title}
      genre={movieById.genre}
      releaseDate={movieById.releaseDate}
      format={movieById.formats}
      language={movieById.language}
      movieId={movieById._id}
      onBookShow={()=> navigate(`/show/${movieById._id}`)}
    />
  )}

  <div className='flex flex-col my-10'>

    <div  className=' text-3xl font-extrabold text-black p-5 '>
      About the Movie
    </div>
   <div className='text-black'> {movieById?.description || stockDes}</div>

   <div>
    
    {/* {movieById && (
      <CastAndCrew
      poster={movieById?.characters?.playedBy?.avatar.url}
      actor={movieById?.characters?.playedBy?.name}
      character={movieById?.characters?.name}
      />
      
    )} */}

{movieById?.characters?.length > 0 && (
  <>
    <div className='text-3xl font-extrabold text-black p-5'>Cast and Crew</div>
    <div className='flex gap-10 flex-wrap p-5'>
      {movieById.characters.map((char, idx) => (
        <Link
          to={`/admin/actor/${char.playedBy?._id}`}
          key={char._id || idx}
          className='hover:scale-105 transition-transform duration-300'
        >
          <CastAndCrew
            poster={char.playedBy?.avatar}
            actor={char.playedBy?.name}
            character={char.name}
          />
        </Link>
      ))}
    </div>
  </>
)}





   </div>


  </div>


    </div>
    </div>
  )
}

export default MovieDetail
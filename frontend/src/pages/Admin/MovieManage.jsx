import MovieTable from '@/components/Admin/MovieManage/MovieTable'
import { deleteMovie, getAllMovies } from '@/store/Slices/movieSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



function MovieManage() {

    const dispatch = useDispatch()
    const movies = useSelector((state)=>state.movie?.movies)
    const  navigate = useNavigate()

    useEffect(()=>{
        dispatch(getAllMovies())
    },[dispatch])

    useEffect(()=>{
        console.log(`all movies`,movies);
        
    })


    const handleEdit = (movieId) => {
        console.log("Edit movie with ID:", movieId)
        navigate(`/admin/movieManage/${movieId}`)
       
      }
    
      const handleDelete = async(movieId) => {
        // Show confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to delete this movie?");
      
        // Proceed with deletion if the user confirmed
        if (isConfirmed) {
          console.log("Delete movie with ID:", movieId);
          await dispatch(deleteMovie(movieId));
        } else {
          console.log("Deletion cancelled.");
        }
      };
      

  return (
    <div className='text-white w-full'>




       <div>
       <MovieTable  data={movies} text={"Movies"} onDelete={handleDelete} onEdit={handleEdit}/>
       </div>

       <div className='w-full'>
        <button 
        onClick={()=> navigate(`/admin/movieManage/create`)}
        className='flex itmes-center justify-center mx-auto bg-pink-500 w-[130px] h-8 text-center m-5 border-2 rounded-2xl hover:animate-bounce cursor-pointer'>Create Movie</button>
       </div>
      
    </div>
  )
}

export default MovieManage











// movie manage task 
// display all the movies in table -movieTable
// add plus btn to add the movie -addmovie
// add delete btn in table to delete movie - delete(inside the table)
// add edit btn in movie to edit the movie - edit movie (form component)
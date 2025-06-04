import AdminTable, { AdminTableForMovie } from '@/components/Admin/AdminTable'
import { fetchRevenuePerMonth, fetchRevenuePerMovie, fetchTotalRevenue } from '@/store/Slices/revenueSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'





function DashBoard() {

const revenuePerMonth =useSelector((state)=> state.revenue?.revenuePerMonth)
const revenuePerMovie =useSelector((state)=> state.revenue?.revenuePerMovie)
const totalRevenue =useSelector((state)=> state.revenue?.totalRevenue)

const dispatch = useDispatch()

useEffect(()=>{
    dispatch(fetchRevenuePerMonth())
},[dispatch])


useEffect(()=>{
    console.log(`revenue per month`,revenuePerMonth);
    
},[revenuePerMonth])


useEffect(()=>{
    dispatch(fetchRevenuePerMovie())
},[dispatch])


useEffect(()=>{
    console.log(`revenue per movie`,revenuePerMovie);
    
},[revenuePerMonth])

useEffect(()=>{
    dispatch(fetchTotalRevenue())
},[dispatch])


useEffect(()=>{
    console.log(`total`,totalRevenue);
    
},[revenuePerMonth])

  return (
    <div className='text-black'>Welcome Admin What's New Today
    <AdminTable data={revenuePerMonth} text={"Revenue Per Month"}/>
    <AdminTableForMovie data={revenuePerMovie} text={"Revenue Per Movie"}/>
    <div className='bg-pink-500 flex items-center justify-center my-10  mx-auto h-20 w-[80%] text-3xl animate-bounce'>Total Revenue: {totalRevenue}</div>
    </div>
  )
}

export default DashBoard


import React, { useEffect } from 'react'
import { Logo, Input, Button } from '../index'
import { useForm } from 'react-hook-form'
import {adminLogin,getCurrentAdmin} from '@/store/Slices/adminSlice'
// import { createAccount, userLogin } from '@/store/Slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import GetImagePreview from '../GetImagePreview'
// import {Skeleton} from '../components/ui/skeleton'
import LoginSkeleton from '../../skeleton/LoginSkeleton'




function AdminLogin() {

    const{handleSubmit,register,formState:{errors}} = useForm()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.admin?.loading)

    

    const submit = async(data)=>{
        const isEmail = data.username.includes('@')
        const loginData = isEmail
        ? {email:data.username, password:data.password} :data

        const response = await dispatch(adminLogin(loginData))
        const user  = await dispatch(getCurrentAdmin())
        if(user && response?.payload){
            navigate('/admin')
        }
    }

    if(loading){
        return <LoginSkeleton />
    }


  return (
   <>
    <div className="w-full h-screen text-black p-3 flex justify-center items-start">
                <div className="flex max-w-5xl flex-col space-y-5 justify-center items-center border border-slate-600 p-3 mt-20">
                    <div className="flex items-center gap-2 mt-5">
                        <Logo />
                    </div>

                    <form
                        onSubmit={handleSubmit(submit)}
                        className="space-y-5 p-2"
                    >
                        <Input
                            label="Username / email : "
                            type="text"
                            placeholder="example@gmail.com"
                            {...register("username", {
                                required: "username is required",
                            })}
                        />
                        {errors.username && (
                            <span className="text-red-500">
                                {errors.username.message}
                            </span>
                        )}
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="1kd074fjw0"
                            {...register("password", {
                                required: "password is required",
                            })}
                        />
                        {errors.password && (
                            <span>{errors.password.message}</span>
                        )}

                        <Button
                            type="submit"
                            bgColor="bg-purple-500"
                            className="w-full bg-pink-500 sm:py-3 py-2 hover:bg-pink-700 text-lg"
                        >
                            Login
                        </Button>

                        <p className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link
                                to={"/admin/signup"}
                                className="text-purple-600 cursor-pointer hover:opacity-70"
                            >
                                SignUp
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
   </>
  )
}

export default AdminLogin
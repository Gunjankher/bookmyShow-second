import React from 'react'
import { Logo, Input, Button } from '../index'
import { useForm } from 'react-hook-form'
// import { createAccount, userLogin } from '@/store/Slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import GetImagePreview from '../GetImagePreview'
// import {Skeleton} from '../components/ui/skeleton'
import LoginSkeleton from '../../skeleton/LoginSkeleton'
import {createAccount,adminLogin} from '../../store/Slices/adminSlice'


function AdminSignup() {
    const { handleSubmit, control, register, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.auth?.loading)
  

    const submit = async (data) => {
        const response = await dispatch(createAccount(data))
        if(response?.payload?.success){
            const {username,password} = data
            const loginResult = await dispatch(adminLogin({username,password}))
        

        // use meta.request to checkthe fullfillment

        if(loginResult?.meta?.requestStatus === "fulfilled"){
            navigate("/terms&conditions")
        }else{
            console.error("Login failed after account creation.");
                navigate("/admin/login");
        }
    }
    else{
        console.error("Account creation unsuccessful.");
    }
        
    }

    if (loading) {
        return <LoginSkeleton />
    }

    return (
        <div className='w-full h-screen text-black p-3 flex justify-center items-start sm:mt:8'>
            <div className='flex flex-col space-y-2 justify-center items-center border border-slate-600 p-3'>
                <div className='flex items-center gap-2'>
                    <Logo />
                </div>

                <form
                    onSubmit={handleSubmit(submit)}
                    className='space-y-4 p-2 text-sm sm:w-96 w-full'
                >



                    <div className='w-full relative h-28 bg-[#222222]'>
                        <div className='w-full h-full'>
                            <GetImagePreview
                                name="coverImage"
                                control={control}
                                className="w-full h-28 object-cover border-none border-slate-900 bg-white"
                                cameraIcon
                            />
                            <div className='text-sm absolute right-2 bottom-2 hover:text-purple-500 cursor-default'>
                                coverImage
                            </div>
                        </div>
                        <div className="absolute left-2 bottom-2 rounded-full border-2">
                            <GetImagePreview
                                name="avatar"
                                control={control}
                                className="object-cover rounded-full h-20 w-20 outline-none bg-white"
                                cameraIcon={true}
                                cameraSize={20}
                            />
                        </div>
                    </div>


                    {/* input form  */}

                    {errors.avatar && (
                        <div className='text-red-500'>
                            {errors.avatar.message}
                        </div>
                    )}

                    <Input
                        label="Username:"
                        type="text"
                        placeholder="Enter Username"
                        {...register("username", {
                            required: "username is required"
                        })}
                        className='h-8'
                    />

                    {errors.username && (
                        <span className="text-red-500">
                            {errors.username.message}
                        </span>
                    )}

                    <Input
                    label = "Email :"
                    type = "Email"
                    placeholder = "Enter email"
                    {...register("email",{
                        required:"email is required"
                    })}
                    className= "h-8"
                     />

{errors.email && (
                            <span className="text-red-500">
                                {errors.email.message}
                            </span>
                        )}
                        <Input
                            label="Fullname: "
                            type="text"
                            placeholder="Enter fullname"
                            {...register("fullName", {
                                required: "fullName is required",
                            })}
                            className="h-8"
                        />
                        {errors.fullName && (
                            <span className="text-red-500">
                                {errors.fullName.message}
                            </span>
                        )}
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter password"
                            {...register("password", {
                                required: "password is required",
                            })}
                            className="h-8"
                        />
                        {errors.password && (
                            <span className="text-red-500">
                                {errors.password.message}
                            </span>
                        )}

                        <Button
                        type='submit'
                        bgColor='bg-purple-500'
                        className=' bg-pink-500 w-full sm:py-3 py-2 hover:bg-pink-700 text-lg text-white'
                        >
                            Signup
                        </Button>

                        <p className="text-center text-sm">
                            Already have an account?{" "}
                            <Link
                                to={"/login"}
                                className="text-pink-600 cursor-pointer hover:opacity-70"
                            >
                                Login
                            </Link>
                        </p>

                </form>


            </div>

        </div>
    )
}

export default AdminSignup
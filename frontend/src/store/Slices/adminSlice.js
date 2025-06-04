import axiosInstance from '@/helpers/axiosInstance'
import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast'


const initialState = {
    loading:false,
    status :false,
    adminData:null
}



export const createAccount = createAsyncThunk("register",async(data)=>{
    const formData = new FormData()

    formData.append("avatar", data.avatar[0]);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("fullName", data.fullName);
    if (data.coverImage) {
        formData.append("coverImage", data.coverImage[0]);
    }

    try {
        const response = await axiosInstance.post("/admin/register", formData);
        console.log(`create account data`,response.data);
        toast.success("Registered successfully!!!");
        return{...response.data,success: true }
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
})



export const adminLogin = createAsyncThunk("login", async(data)=>{
    try {
        
        const response = await axiosInstance.post('/admin/login',data,{
            withCredentials:true,
            headers:{
                Authorization:`Bearer ${data.accessToken}`
            }
        })

        console.log(`this is response`, response);
        
        return {
            user:response.data?.data?.admin,
            accessToken: response.data?.data?.accessToken,
            refreshToken: response.data?.data?.refreshToken           
        }

    } catch (error) {
        toast.error(error?.response?.data?.error)
    }
})


export const adminLogout = createAsyncThunk('logout',async()=>{
    try {
        

        const response = await axiosInstance.post("/admin/logout")
        console.log(`this is logout`, response);
        
        toast.success(response.data?.message)

        return response.data?.data

    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})


export const refreshAccessToken = createAsyncThunk(
    "refreshAccessToken",
    async(data)=>{
        try {
            const response = await axiosInstance.post(
                "/admin/refresh-token",
                data
            ) 

            return response.data
        } catch (error) {
            toast.error(error?.response?.data?.error)
            throw error;
        }
    }
)


export const changePassword = createAsyncThunk("changePassword",async(data)=>{
    try {
        const response = await axiosInstance.post(
            "/admin/change-password",
            data
        )
        toast.success(response.data?.message);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})


export const getCurrentAdmin = createAsyncThunk("getCurrentUser", async () => {
    const response = await axiosInstance.get("/admin/current-user");
    console.log(`this is currebt user res`, response);
    
    return response.data?.data;
});

export const updateAvatar = createAsyncThunk("updateAvatar", async (avatar) => {
    try {
        const response = await axiosInstance.patch(
            "/admin/avatar",
            avatar
        );
        toast.success("Updated details successfully!!!");
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const updateCoverImg = createAsyncThunk(
    "updateCoverImg",
    async (coverImage) => {
        try {
            const response = await axiosInstance.patch(
                "/admin/update-coverImg",
                coverImage
            );
            toast.success(response.data?.message);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const updateAdminDetails = createAsyncThunk(
    "updateAdminDetails",
    async (data) => {
        try {
            const response = await axiosInstance.patch(
                "/admin/update-account",
                data
            );
            toast.success("Updated details successfully!!!");
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);



const adminSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(createAccount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createAccount.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(adminLogin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(adminLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.adminData = action.payload?.user;
            // console.log(`state admin data`,action.payload?.user);
            
            state.accessToken = action.payload?.accessToken;
            state.refreshToken = action.payload?.refreshToken;
        });
        builder.addCase(adminLogout.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(adminLogout.fulfilled, (state) => {
            state.loading = false;
            state.status = false;
            state.adminData = null;
            state.accessToken = null
            state.refreshToken = null
        });
        builder.addCase(adminLogout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Logout failed"; // Store error message if needed
        });
        builder.addCase(getCurrentAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCurrentAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.status = true;
            state.adminData = action.payload;
        });
        builder.addCase(getCurrentAdmin.rejected, (state) => {
            state.loading = false;
            state.status = false;
            state.adminData = null;
        });
        
        builder.addCase(updateAvatar.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateAvatar.fulfilled, (state, action) => {
            state.loading = false;
            state.adminData = action.payload;
        });
        builder.addCase(updateAvatar.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(updateCoverImg.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCoverImg.fulfilled, (state, action) => {
            state.loading = false;
            state.adminData = action.payload;
        });
        builder.addCase(updateCoverImg.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(updateAdminDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateAdminDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.adminData = action.payload;
        });
    }
})


export default adminSlice.reducer
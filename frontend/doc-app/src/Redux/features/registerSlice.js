import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios";

export const register = createAsyncThunk("user/register",async(values)=>{
    const response = await axios.post('/api/user/register',values)
    console.log('registerthunk',response.data)
    return response.data
})

const registerSlice = createSlice({
    name:'Register',
    initialState:{
        data:[],
        error:null,
        satus:"idle",
        extraReducers:(builder)=>{
            builder.addCase(register.fulfilled,(state,action)=>{
                state.status="success"
                state.data=action.payload
            })
        }
    }
})

export default registerSlice.reducer
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "../../config/axios";
import { toast } from "react-toastify";



export const createDoctor = createAsyncThunk('doctor/createDoctor',async(values,{getState,rejectWithValue})=>{
    console.log(values)
    const { availability } = values;

    // Safeguard to ensure availability.time is an array and has at least two elements
    const timeRange = availability.time || [];
  
    const formattedValues = {
      ...values,
      availability: {
        ...availability,
        time: {
          start: timeRange[0] ? timeRange[0].format('HH:mm') : null,  // Safely access the first element
          end: timeRange[1] ? timeRange[1].format('HH:mm') : null,    // Safely access the second element
        },
      },
    };
   console.log('formatted values',formattedValues)
    try{
        const response = await axios.post('/api/doctor',formattedValues,{headers:{Authorization:localStorage.getItem('token')}})
        console.log(response)
        toast('appied successfully')
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

const doctorSlice = createSlice({
    name:"doctor",
    data:[],
    initialState:{
        doctor:null,
    },extraReducers:(builder)=>{
        builder.addCase(createDoctor.fulfilled,(state,action)=>{
            state.data = action.payload
        })
        
    }
})

export default doctorSlice.reducer
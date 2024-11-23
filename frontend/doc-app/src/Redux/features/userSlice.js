import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../config/axios'

export const fetchUser = createAsyncThunk('user/fetchUser',async()=>{
    const response = await axios.get('/api/user/account',{ headers: { 'Authorization': localStorage.getItem('token')}})
    console.log('userThunk',response)
    return response.data
})

const userSlice = createSlice({
    name:"user",
    data:[],
    initialState:{
        user:null,
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.data = action.payload; // Set user data from action
        })
    }
})
console.log(userSlice.data)

export default userSlice.reducer
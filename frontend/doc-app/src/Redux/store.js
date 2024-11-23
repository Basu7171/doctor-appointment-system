import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertSlice";
import userReducer from "./features/userSlice";
import doctorReducer from "./features/doctorSlice"


export default configureStore({
    reducer:{
        alerts:alertSlice.reducer,
        user:userReducer,
        doctor:doctorReducer
    }
})
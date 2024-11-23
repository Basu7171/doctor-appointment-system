import Home from "./pages/homePage"
import {Routes,Route} from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./pages/Register"
import Login from "./pages/Login"
import { useSelector } from "react-redux";
import Spinner from "./components/Spinners";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notification from "./pages/Notification";
import Doctors from "./pages/admin/Doctors";
import Users from "./pages/admin/Users";
import Profile from "./pages/Doctor/Profile";
import Bookingpage from "./pages/Bookingpage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import AdminProfile from "./pages/admin/Profile";
import UserProfile from "./pages/UserProfile";


export default function App(){
  const {loading} = useSelector(state=>state.alerts)
  
  return (
    <div>
      {loading ? <Spinner/> :(
        <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Home/>
          </PrivateRoute>}/>
        <Route path="/apply-doctor" element={
          <PrivateRoute>
            <ApplyDoctor/>
        </PrivateRoute>}/>
        <Route path="/admin/doctors" element={
          <PrivateRoute>
            <Doctors/>
          </PrivateRoute>}/>
          <Route path="/admin/users" element={
          <PrivateRoute>
            <Users/>
          </PrivateRoute>}/>
          <Route path="/admin/profile" element={
          <PrivateRoute>
            <AdminProfile/>
          </PrivateRoute>}/>
          <Route path="/doctor/profile/:id" element={
          <PrivateRoute>
            <Profile/>
          </PrivateRoute>}/>
          <Route path="/doctor/book-appointment/:doctorId" element={
          <PrivateRoute>
            <Bookingpage/>
          </PrivateRoute>}/>
        <Route path="/notification" element={
          <PrivateRoute>
            <Notification/>
        </PrivateRoute>}/>
        <Route path="/register" element={
          <PublicRoute>
            <Register/>
          </PublicRoute>}/>
        <Route path="/login" element={
          <PublicRoute>
            <Login/>
          </PublicRoute>}/>
          <Route path="/user/profile" element={
          <PrivateRoute>
            <UserProfile/>
          </PrivateRoute>}/>
          <Route path="/appointments" element={
          <PrivateRoute>
            <Appointments/>
          </PrivateRoute>}/>
          <Route path="/doctor/appointments" element={
          <PrivateRoute>
            <DoctorAppointments/>
          </PrivateRoute>}/>
      </Routes>
      )}
        
        <ToastContainer/>
    </div>
  )
}
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ConfigureDB from './config/db.js'
import userCltr from './app/controllers/user-Cltr.js'
import doctorCltr from './app/controllers/doctor-Cltr.js'
import { checkSchema } from 'express-validator'
import { userLoginValidatonSchema, userRegisterValidationSchema } from './app/validators/user-validation.js'
import { doctorRegisterValidationSchema,doctorLoginValidatonSchema } from './app/validators/doctor-validation.js'
import authenticateUser from './app/middleware/authenticateUser.js'
import authorizeUser from './app/middleware/AuthorizeUser.js'
import adminCltr from './app/controllers/admin-Cltr.js'
import appointmentCltr from './app/controllers/appointment-Cltr.js'
import notificationCltr from './app/controllers/notification-Cltr.js'
import checkUserStatus from './app/middleware/checkUserStatus.js'
import profileCltr from './app/controllers/profile-Cltr.js'
import upload from './app/middleware/multer.js'

dotenv.config()
const app = express()
ConfigureDB()

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(cors())

//User
app.post('/api/user/register',checkSchema(userRegisterValidationSchema),userCltr.register)
app.post('/api/user/login',checkSchema(userLoginValidatonSchema),checkUserStatus,userCltr.login)
app.get('/api/user/account',authenticateUser,userCltr.showUser)
app.delete('/api/user/:id',authenticateUser,authorizeUser(['admin']),userCltr.destroy)
app.get('/api/appointments',authenticateUser,userCltr.appointments)

//Doctor
app.post('/api/doctor',authenticateUser,checkSchema(doctorRegisterValidationSchema),doctorCltr.create)
app.get('/api/doctor/profile/:id',authenticateUser,doctorCltr.getDoctorProfile)
app.put('/api/doctor/profile',authenticateUser,doctorCltr.updateProfile)
app.get('/api/doctors',authenticateUser,doctorCltr.getAllDoctors)
app.get('/api/doctor',authenticateUser,doctorCltr.showDoctor)
app.get('/api/doctor/appointments',authenticateUser,doctorCltr.appointments)
app.put('/api/doctor/appointments',authenticateUser,doctorCltr.updateAppointmentStatus)

//Admin
app.get('/api/users/',authenticateUser,authorizeUser(['admin']),adminCltr.listAllUsers)
app.get('/api/doctors/',authenticateUser,authorizeUser(['admin']),adminCltr.listAllDoctors)
app.put('/api/doctor/status',authenticateUser,authorizeUser(['admin']),adminCltr.changeAccountStatus)
app.put('/api/doctor-reject',authenticateUser,authorizeUser(['admin']),adminCltr.RejectDoctor)
app.put('/api/user-block',authenticateUser,authorizeUser(['admin']),adminCltr.BlockUser)
app.put('/api/user-unblock',authenticateUser,authorizeUser(['admin']),adminCltr.BlockUser)

//Notification
app.post('/api/notification',authenticateUser,notificationCltr.notification)
app.delete('/api/notification',authenticateUser,notificationCltr.deleteNotification)

//Appointment
app.post('/api/appointment/book',authenticateUser,appointmentCltr.bookAppointment)
app.post('/api/appointment/checkavailability',authenticateUser,appointmentCltr.checkAvailability)

//Profile

app.post('/api/profile',authenticateUser,upload.single('avatar'),profileCltr.create)
app.get('/api/profile',authenticateUser,upload.single('avatar'),profileCltr.show)



app.listen(process.env.PORT,()=>{
    console.log('server running on port',process.env.PORT)
})


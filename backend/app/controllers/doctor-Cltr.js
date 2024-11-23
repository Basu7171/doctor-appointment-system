import Doctor from "../models/doctor-model.js";
import { validationResult } from "express-validator";
import User from "../models/user-model.js";
import Appointment from "../models/appointment-model.js";

const doctorCltr = {}

doctorCltr.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const body = req.body;
        const userId = req.userId

        // Spread body fields into the doctor schema correctly
        const doctor = new Doctor({
            ...body,  // Spreads the fields correctly
            userId,
            status: 'Pending'
        });

        // Save the doctor document
        await doctor.save();
        console.log("Doctor created successfully:", doctor);

        // Find the admin user and update their notifications
        const adminUser = await User.findOne({ role: "admin" }); // Added 'await' here
        if (adminUser) {
            const notification = adminUser.notification || [];
            notification.push({
                type: 'apply-doctor-request',
                message: `${doctor.firstname} ${doctor.lastname} has applied for a Doctor account`,
                data: {
                    doctorId: doctor._id,
                    name: doctor.firstname + " " + doctor.lastname, // Add space between names
                    onclickPath: '/admin/doctors'
                }
            });

            // Update the admin user's notifications
            await User.findByIdAndUpdate(adminUser._id, { notification });
        }

        return res.status(201).json(doctor);
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err.message });
        console.log(err);
    }
};

doctorCltr.getDoctorProfile = async(req,res)=>{
    try {
        const doctor = await Doctor.findOne({userId:req.params.id})
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            success:true,
            message:"doctor data fetched successfully",
            data:doctor
        })
    } catch (error) {
       console.log(error)
       res.status(500).json({
        success:false,
        message:"error in fetching doctor info",
        error
       }) 
    }
}

doctorCltr.updateProfile = async(req,res)=>{
    const {  userId,...updateData } = req.body; 
    try {
        const doctor = await Doctor.findOneAndUpdate({userId},updateData,{new:true})
         if (!doctor) {  
            return res.status(404).json({  
                success: false,  
                message: "Doctor not found"  
            });  
        }  
        res.status(200).json({
            success:true,
            message:"Doctor Profile Updated",
            data:doctor,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'Doctor profile update issue',
            error
        })
    }
}

doctorCltr.getAllDoctors = async(req,res)=>{
    try {
        const doctors = await Doctor.find({})
        res.status(200).json({
            success:true,
            message:"Doctors fetched succesfully",
            data:doctors
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error in fetching All Doctors",
            error
        })
    }
}

doctorCltr.showDoctor = async(req,res)=>{
    try {
        const doctorId = req.query.doctorId
        if (!doctorId) {
            return res.status(400).json({
                success: false,
                message: "Doctor ID is required",
            });
        }

        const doctor = await Doctor.findOne({_id:doctorId})
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }
        res.status(200).json({
            success:true,
            message:"single doctor fetched",
            data:doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error while fetching doctor",
            error,
        })
    }
}

doctorCltr.appointments = async(req,res)=>{
    try {
        const doctor = await Doctor.findOne({userId:req.userId})
        const appointments  = await Appointment.find({doctorId:doctor._id})
        res.status(200).json({
            success:true,
            message:"Doctor Appointments fetched successfully",
            data:appointments,
        }) 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'error while fetching doctor appointments',
            error,
        })
    }
}

doctorCltr.updateAppointmentStatus = async (req, res) => {
    try {
      const { appointmentsId, status } = req.body;
      const appointments = await Appointment.findByIdAndUpdate(
        appointmentsId,
        { status },
        { new: true }
      );
      const user = await User.findOne({ _id: appointments.userId });
      const notification = user.notification;
      notification.push({
        type: "status-updated",
        message: `your appointment has been updated ${status}`,
        onCLickPath: "/doctor-appointments",
      });
      await user.save();
      res.status(200).send({
        success: true,
        message: "Appointment Status Updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error In Update Status",
      });
    }
  };

export default doctorCltr
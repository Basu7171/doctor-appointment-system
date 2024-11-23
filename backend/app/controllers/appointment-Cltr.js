import Appointment from "../models/appointment-model.js";
import User from "../models/user-model.js";
import Doctor from "../models/doctor-model.js";
import moment from 'moment';

const appointmentCltr = {};

appointmentCltr.checkAvailability = async (req, res) => {
    const { doctorId, date, time } = req.body;

    try {
        const existingAppointments = await Appointment.find({
            doctorId: doctorId,
            date: date,
            $or: [
                { "time.start": { $lt: time.end, $gte: time.start } },
                { "time.end": { $gt: time.start, $lte: time.end } },
            ],
        });

        res.status(200).json({ available: existingAppointments.length === 0 });
    } catch (error) {
        console.error("Error checking availability:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// appointmentCltr.js
appointmentCltr.bookAppointment = async (req, res) => {
    try {
        const {
            doctorId,
            userId,
            doctorInfo,
            userInfo,
            date,
            time,
        } = req.body;

        // Log request body for debugging
        console.log("Booking Request Body:", req.body);

        // Validate required fields
        if (!doctorId || !userId || !date || !time.start || !time.end) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Find doctor by ID
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        // Initialize doctor notification if not present
        if (!doctor.notification) {
            doctor.notification = [];
        }

        // Add notification to the doctor
        doctor.notification.push({
            type: "New-appointment-request",
            message: `A new Appointment Request from ${userInfo.name}`,
            onClickPath: "/doctor/appointments",
        });

        // Create new appointment
        const appointment = new Appointment({
            doctorId,
            userId,
            doctorInfo,
            userInfo,
            date,
            time,
            status: "pending",
        });

        // Save changes
        await appointment.save();
        await doctor.save();

        res.status(201).json({ success: true, message: "Appointment booked successfully", appointment });
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ success: false, message: "Failed to book appointment", error });
    }
};

export default appointmentCltr;

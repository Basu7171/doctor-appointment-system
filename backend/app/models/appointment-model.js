import mongoose, { Schema, model } from "mongoose";

const appointmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",  // Assuming you have a User model
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",  // Assuming you have a Doctor model
      required: true,
    },
    doctorInfo: {
      firstName: String,
      lastName: String,
      specialization: String,
    },
    userInfo: {
      name: String,
      email: String,
    },
    date: {
      type: Date,  // Store date as Date object
      required: true,
    },
    time: {
      start: {
        type: String, // If using specific time ranges
        required: true,
      },
      end: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "completed", "cancelled"],  // Enum for status
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

const Appointment = model("Appointment", appointmentSchema);

export default Appointment;

import mongoose, { Schema,model } from "mongoose";

const doctorSchema = new Schema({
     userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User',
    },
    firstname:String,
    lastname:String,
    email:String,
    phone:String,
    address:String,
    role:{
        type:String,
        default:'doctor'
    },
    specialization:String,
    availability:{
        days: {
            type: [String],  
            required: true
          },
          time: {
            start: { type: String, required: true }, 
            end: { type: String, required: true } 
          }
    },
    experience:Number,
    qualification:String,
    status:{
      type:String,
      enum:['pending','approved'],
      default:"pending"
    },
    patients:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
      }],
},{timestamps:true})

const Doctor = model('Doctor',doctorSchema)

export default Doctor
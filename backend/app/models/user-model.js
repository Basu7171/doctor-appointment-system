import { Schema,model } from "mongoose";

const userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:'user'
    },notification: {
        type: Array,
        default: [],
      },
      seennotification: {
        type: Array,
        default: [],
      },
      status: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active'
      }
},{timestamps:true})

const User = model('User',userSchema)

export default User
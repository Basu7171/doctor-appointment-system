import { Schema, model } from "mongoose";

const profileSchema = new Schema ({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    avatar:String,
},{timestamps:true})

const Profile = model("Profile",profileSchema)

export default Profile
import Doctor from "../models/doctor-model.js";
import { validationResult } from "express-validator";
import User from "../models/user-model.js";

const notificationCltr = {}

notificationCltr.notification = async(req,res)=>{
    try{
        const user = await User.findOne({_id:req.body.userId})
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
         // Move all notifications to seen
         user.seennotification.push(...user.notification);
         user.notification = [];  // Clear unread notifications
 
         const updatedUser = await user.save();
        res.status(200).json({
            success: true,
            message: "all notification marked as read",
            data: updatedUser,
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Error in notification",
            success: false,
            err,
        })
    }
}

notificationCltr.deleteNotification = async(req,res)=>{
    try{
        const user = await User.findOne({_id:req.body.userId})
        user.notification = []
        user.seennotification = []
        const updatedUser = await user.save()
        updatedUser.password = undefined
        res.status(200).json({
            success: true,
            message: "Notifications Deleted successfully",
            data: updatedUser,
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "unable to delete all notifications",
            err,
        })
    }
}

export default notificationCltr
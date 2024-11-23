import Doctor from "../models/doctor-model.js"
import User from "../models/user-model.js"

const adminCltr = {}

adminCltr.listAllUsers = async(req,res)=>{
    try{
        const users = await User.find({})
        res.status(200).json({
            success:true,
            message:"users data list",
            data:users
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"error while fetching list of Users",
            success:false,
            err
        })
    }
}

adminCltr.listAllDoctors=async(req,res)=>{
    try{
        console.log("Received request to list all doctors");
        const doctors = await Doctor.find({ status: { $in: ['pending', 'approved'] } }).populate('userId','name email')
        console.log(" fetched doctors", doctors); 
        const filteredDoctors = doctors.filter(doc => 
            doc.status.toLowerCase() === 'pending' || doc.status.toLowerCase() === 'approved'
        );
        console.log("Filtered doctors (pending or approved):", filteredDoctors);  // Log filtered doctors

        db.doctors.find({ status: { $in: ['pending', 'approved'] } }).pretty();

        res.status(200).json({
            success:true,
            message:"doctors data list",
            data:doctors
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"error while fetching list of doctors",
            success:false,
            err
        })
    }
}

adminCltr.changeAccountStatus = async(req,res)=>{
    try {
        const {doctorId,status}=req.body
        const doctor = await Doctor.findByIdAndUpdate(doctorId,{status},{ new: true })
        const user = await User.findById({_id:doctor.userId})
        const notification = user.notification
        notification.push({
            type:"doctor account request updated",
            message:`your doctor request has ${status}`,
            onClickPath:"/notification"
        })
        user.role = status === "approved" ? "doctor" : "user";
        await user.save()
        res.status(200).json({
            success: true,
            message: "Account Status Updated",
            data: doctor,
        })
    } catch (error) {
        console.log(error);
    res.status(500).json({
      success: false,
      message: "Eror in Account Status",
      error,
    });
    }
}

adminCltr.RejectDoctor = async (req,res) =>{
    const {doctorId} = req.body
    try {
        const doctor = await Doctor.findByIdAndUpdate(doctorId,{ status: "pending" },{new:true})
        res.status(200).json({success:true,doctor})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Something went wrong', error });
    }
}

adminCltr.BlockUser = async(req,res)=>{
    const {userId} = req.body
    const status = 'blocked';
    try {
        const user = await User.findByIdAndUpdate(userId,{status},{new:true})
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
          }
          res.status(200).json({ success: true, message: `User status updated to ${status}`, user });
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"error in blocking user",error})
    }
}

adminCltr.UnblockUser = async (req, res) => {
    const { userId } = req.body; // Get userId from the request body
    const status = 'active'; // Define the status to update (or whatever is appropriate)
    try {
        const user = await User.findByIdAndUpdate(userId, { status }, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: `User status updated to ${status}`, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error in unblocking user", error });
    }
};

export default adminCltr
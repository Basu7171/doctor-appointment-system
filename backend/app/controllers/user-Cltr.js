import User from "../models/user-model.js";
import { validationResult } from "express-validator";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"
import Appointment from "../models/appointment-model.js";

const userCltr = {}

userCltr.register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const body = req.body
    try {
        const userCount = await User.countDocuments()
        const user = new User(body)
        const salt = await bcryptjs.genSalt()
        const hash = await bcryptjs.hash(user.password, salt)
        user.password = hash
        if(userCount === 0){
            user.role = 'admin'
        }
        await user.save()
        res.status(201).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
}

userCltr.login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const {email,password} = req.body
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({ error: "invalid email/password" })
        }
        const isValid = await bcryptjs.compare(password, user.password)
        if (!isValid) {
            return res.status(404).json({ error: "invalid email/password" })
        }
        const tokenData = {userId:user._id,role:user.role}
        const token = jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'12h'})
        return res.json({token})
    } catch (err) {
        res.status(500).json({ error: "something went wrong" })
    }
}

userCltr.listUser = async(req,res)=>{
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.status(500).json("Somthing went wrong",err)
    }
}

userCltr.showUser = async(req,res)=>{
    try{
        const user = await User.findById(req.userId)
        if(!user){
            res.status(404).json({error:"User not found"})
        }
        res.status(200).json(user)
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Something went wrong"})
    }
}

userCltr.destroy = async(req,res)=>{
    try{
        const id = req.params.id
        if(id == req.userId){
            return res.status(400).json({error:"you cannot delete your own account"})
        }
        const user = await User.findByIdAndDelete(id)
        res.json(user)
    }catch(err){
        res.status(500).json({error:"somthing went wrong"})
        console.log(err)
    }
}

userCltr.appointments = async(req,res)=>{
    console.log(req.body.userId)
    try {
        const appointments = await Appointment.find({userId:req.userId})
        res.status(200).json({
            success:true,
            message:"user appointments fetched successfully",
            data:appointments,
        })
        console.log(appointments)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'error while fetching appointments'
        })
    }
}


export default userCltr
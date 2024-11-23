import mongoose from "mongoose";

const ConfigureDB=async()=>{
    try{
        const db= await mongoose.connect(process.env.DB_URL)
        console.log('db connected',db.connections[0].name)
    }catch(err){
        console.log(err)
    }
}

export default ConfigureDB
import Doctor from "../models/doctor-model.js";
//import { body } from "express-validator";

export const doctorRegisterValidationSchema={
    firstname:{
        exists:{
            errorMessage:"firstname field is required"
        },
        notEmpty:{
            errorMessage:"firstname cannot be empty"
        },
        trim:true
    },
    lastname:{
        exists:{
            errorMessage:"lastname field is required"
        },
        notEmpty:{
            errorMessage:"lastname cannot be empty"
        },
        trim:true
    },
    email:{
        exists:{
            errorMessage:"email field is required"
        },
        notEmpty:{
            errorMessage:"email cannot be empty"
        },
        isEmail:{
            errorMessage:"email should be in valid format"
        },
        trim:true,
        normalizeEmail:true,
        custom:{
            options: async function (value){
                try{
                    const user= await Doctor.findOne({email:value})
                    if(user){
                        throw new Error("this email already registered")
                    }
                }catch(err){
                    throw new Error(err.message)
                }
            }
        }
    },
    address:{
        exists:{
            errorMessage:"address field is required"
        },
        notEmpty:{
            errorMessage:"address cannot be empty"
        },
        trim:true
    },
    specialization:{
        exists:{
            errorMessage:"specialization field is required"
        },
        notEmpty:{
            errorMessage:"specilization cannot be empty"
        },
        trim:true,
        },
    phone:{
        exists:{
            errorMessage:"specialization field is required"
        },
        notEmpty:{
            errorMessage:"specilization cannot be empty"
        },
        trim:true,
        isMobilePhone:{
            options:['any'],
            errorMessage:"enter valid mobile number"
        }
    },
    experience: {
        exists: {
            errorMessage: "Experience field is required"
        },
        notEmpty: {
            errorMessage: "Experience cannot be empty"
        },
        isInt: {
            options: { min: 1 },
            errorMessage: "Experience must be a valid number greater than 0"
        }
    },
    availability: {
        days: {
            exists: {
                errorMessage: "Availability days are required"
            },
            isArray: {
                errorMessage: "Availability days must be an array"
            },
            notEmpty: {
                errorMessage: "Availability days cannot be empty"
            }
        },
        time: {
            start: {
                exists: {
                    errorMessage: "Availability start time is required"
                },
                notEmpty: {
                    errorMessage: "Availability start time cannot be empty"
                },
                isString: {
                    errorMessage: "Start time must be a valid string"
                }
            },
            end: {
                exists: {
                    errorMessage: "Availability end time is required"
                },
                notEmpty: {
                    errorMessage: "Availability end time cannot be empty"
                },
                isString: {
                    errorMessage: "End time must be a valid string"
                }
            }
        }
    }
};
          
export const doctorLoginValidatonSchema={
    email:{
        exists:{
            errorMessage:"email field is required"
        },
        notEmpty:{
            errorMessage:"email cannot be empty"
        },
        isEmail:{
            errorMessage:"email should be in valid format"
        },
        trim:true,
        normalizeEmail:true,
    },
    password:{
        exists:{
            errorMessage:"password field is required"
        },
        notEmpty:{
            errorMessage:"password cannot be empty"
        },
        isStrongPassword:{
            options:{
                minLength:8,
                maxLength:128,
                minLowerCase:1,
                minUpperCase:1,
                minSymbol:1,
                minNumber:1
            },
            errorMessage:"passwor should have minimum 8 charecter one numeric one lowercase one uppercase one symbol "
        },
        trim:true,
}
}
import User from "../models/user-model.js";

export const userRegisterValidationSchema={
    name:{
        exists:{
            errorMessage:"name field is required"
        },
        notEmpty:{
            errorMessage:"name cannot be empty"
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
                    const user= await User.findOne({email:value})
                    if(user){
                        throw new Error("this email already registered")
                    }
                }catch(err){
                    throw new Error(err.message)
                }
            }
        }
    },
    password:{
        exists:{
            errorMessage:"password field is required"
        },
        notEmpty:{
            errorMessage:"email cannot be empty"
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
export const userLoginValidatonSchema={
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
            errorMessage:"email cannot be empty"
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
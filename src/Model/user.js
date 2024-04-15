import mongoose from "./index.js"


const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };



const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"email is requied"],
        validate:{
            validator:validateEmail,
            message:props=>`${props.value} is not a valid email!`
        }
    },
    password:{
        type:String,
        required:[true,"password is requied"]
    },
    status:{
        type:Boolean,
        default:true
    },
        role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
},{
    collection:'user',
    versionKey:false
})

const userModel= mongoose.model('user',userSchema)


export default userModel
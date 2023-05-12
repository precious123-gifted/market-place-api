import {Schema,model,models} from "mongoose"


const UserSchema = new Schema ({

companyName :{
    type : String ,
    required : [true , "company name is required"],
    minLength : [4,"full name should be atleast 4 letters long"],
    maxLength : [30,"full name should be atmost 30 letters long"],
},

firstName :{
    type : String ,
    required : [true , "first name is required"],
    minLength : [4,"full name should be atleast 4 letters long"],
    maxLength : [30,"full name should be atmost 30 letters long"],
}
,

lastName :{
    type : String ,
    required : [true , "last name is required"],
    minLength : [4,"full name should be atleast 4 letters long"],
    maxLength : [30,"full name should be atmost 30 letters long"],
}
,

jobTitle :{
    type : String ,
    required : [true , "job title is required"],
    minLength : [4,"full name should be atleast 4 letters long"],
    maxLength : [30,"full name should be atmost 30 letters long"],
}
,

industry :{
    type : String ,
    required : [true , "industry is required"],
    select : false,
}
,

email :{
    type : String ,
    unique : true ,
    required : [true , "email is required"],
    match : [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "invalid email address"]
}
,

password :{
    type : String ,
    required : [true , "password is required"],
    select : false,
}
,



 })



const User = models['User'] || model('User', UserSchema, 'business-account');

export default User 






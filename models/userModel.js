const mongoose=require("mongoose");
const userModel=mongoose.Schema({
    email:{
        type:String,
        required:true}
        ,
    password:{
        type:String,
        default:'password'
    },
    firstName:String,
    lastName:String

})
userModel.virtual("FullName").get(()=>{
    return this.firstName+" "+this.lastName;
})
module.exports=mongoose.model("users",userModel)
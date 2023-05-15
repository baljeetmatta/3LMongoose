const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Users=require("./models/userModel");

mongoose.connect("mongodb://localhost:27017/BatchMongodb")
.then(database=>
{
    console.log("Connected");
}
);
app.get("/saveData",(req,res)=>{
let userObjectJson={
    "email":"Testing@gmail.com",
    "password":"Dummypassword"
};
let user=new Users(userObjectJson);
user.save().then(result=>{
    console.log(result);
    res.end();
});

})



app.listen(3000);


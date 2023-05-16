require("dotenv").config();
const express=require("express");


const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json())
const jwt=require("jsonwebtoken");



const json=[

    {
        "name":"user1",
        "title":"First  Post"
    },
    {
        "name":"user2",
        "title":"First  Post"
    }, {
        "name":"user1",
        "title":"Second  Post"
    }

]
app.get("/posts",authenticateuser,(req,res)=>{
    console.log(req.userdata);

    res.json(json.filter(post=>post.name==req.userdata.username));
    

})
//Middleware
function authenticateuser(req,res,next)
{
    //headers
    //BEARER TOKEN
    const authHeader= req.headers["authorization"]
    const token=authHeader && authHeader.split(" ")[1]
    if(token==null) res.sendStatus(401);

    jwt.verify(token,process.env.ACCESS_TOKEN,(err,data)=>{
        if(err) res.sendStatus(403);
        req.userdata=data;
        next();
    })

     
}
app.post("/login",(req,res)=>{

   // console.log(req.body.username);
//res.end();

const userObject={"username":req.body.username};

const token=jwt.sign(userObject,process.env.ACCESS_TOKEN)
res.json(token);



})

app.listen(3000);

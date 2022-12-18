const express=require("express");
const hbs=require("hbs");
const path=require("path");
require("./db/conn")
const User=require("./models/usermessage")
const app=express();

const port=process.env.PORT || 3000;

// //setting a path
const  staticpath=path.join(__dirname,"../public");

const  template_path=path.join(__dirname,"../template/views");
const  partial_path=path.join(__dirname,"../template/partial");
// //middleware
 app.use("/css",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")))
app.use("/js",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")))
 app.use("/jq",express.static(path.join(__dirname,"../node_modules/jquery/dist")))
 app.use(express.urlencoded({extended:false}))
 app.use(express.static(staticpath));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partial_path);

//routing
//app.get(path,callback)

app.get("/",(req,res)=>{
    res.render("index");
// })
// app.get("/contact",(req,res)=>{
//     res.render("contact");
})
app.get("/contact",(req,res)=>{
    res.render("contact");
})
app.post("/contact",async(req,res)=>{
    try{
  //res.send(req.body)
  const userData=new User(req.body);
  await userData.save();
  res.status(201).render("index");
    }catch(error)
    {
        res.status(500).send(error);
    }
})
//server create
app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})
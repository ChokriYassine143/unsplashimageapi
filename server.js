const express=require("express");
const app=express();
const bodyParser = require("body-parser");
const cors = require('cors');
require('dotenv').config();
const { default: mongoose } = require("mongoose");
app.use(cors({
    origin: '*', 
    credentials: true 
  }));
  app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const url=process.env.Mongodb;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    
});

const imageShema= new mongoose.Schema({
    label:String,
    Imagurl:String
});
const Image = mongoose.model("Image", imageShema);
app.get("/images",async(req,res)=>{
    let results= await Image.find().sort({ _id: -1 });
    res.send(results);
});
app.post("/addimage",async (req,res)=>{
    let {label,imageUrl}=req.body
    let img= new Image({
        label:label,
        Imagurl:imageUrl
    });
   let x= await img.save();
   if (x){
    res.send("image submited with success");
   }
   else {res.send("error");}
});
app.delete("/deleteimage/:id",async(req,res)=>{
    let id= req.params.id;
let y= await Image.findByIdAndRemove(id);
if (y) res.send("delete with success");
else res.send("error");
});
app.listen(process.env.port||"3000",()=>{
    console.log("server is running",);
})
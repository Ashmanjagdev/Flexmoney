const express = require("express");
const app = express();
const mongoose=require('mongoose');
let bodyParser=require("body-parser");

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public/'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://ashman:ashmanraju@cluster0.n8apx.mongodb.net/YogaForms');

var forms = new mongoose.Schema({
  name: String,
  age: String,
  email: String,
  phonenumber: String,
  timings:String,
  month: String,
  payment:String
});

const Yogaform=mongoose.model('Yogaform',forms);

app.get("/", (req, res) => {

  res.render("admissionform");
});

app.post("/post", (req, res) => {
  var obj =new Yogaform ({
    name: req.body.fullname,
    age: req.body.age,
    email: req.body.email,
    phonenumber: req.body.number,
    timings:req.body.yimings,
    month: req.body.month,
    payment:'Done'
     });
   obj.save();
  res.render("submitted");
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

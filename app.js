var express= require("express");
var mongoose=require("mongoose");

var path=require("path");
var bodyParser=require("body-parser");
var cookiesParser=require("cookie-parser");
var session =require("express-session");
var flash=require("connect-flash");

var passport=require("passport");

var routes=require("./routes");
//var passportsetup=require("/.passportsetup");
var app=express();

mongoose.connect("mongodb://localhost:27017/zombie_nest");

//passportsetup();

app.set("port",process.env.PORT || 3000);

app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookiesParser());
app.use(session({
secret:"UELlksdjelifnrJIUH389#$#!DJskkokjPJJioi",
resave:true,
saveUninitialized:true
}));
app.use(flash());


app.use(routes);

app.listen(app.get("port"),()=>{
    console.log("La aplicación inició por el puerto"+app.get("port"));
});


var express=require("express");
var Zombie=require("./models/zombie");
var Arma=require("./models/arma")
var passport=require("passport");

var router=express.Router();

router.use((req,res,next)=>{
    res.locals.currentZombie=req.zombie;
    res.locals.errors=req.flash("error");
    res.locals.infos=req.flash("info");
    next();
});
router.use((req,res,next)=>{
    res.locals.currentZArma=req.arma;
    res.locals.errors=req.flash("error");
    res.locals.infos=req.flash("info");
    next();
});

router.get("/",(req,res,next)=>{
Zombie.find()
.sort({createdAt:"descending"})
.exec((err,zombies)=>{
if(err){
    return next(err);
}
res.render("index",{zombies:zombies});
});
});
router.get("/",(req,res,next)=>{
    Arma.find()
    .sort({createdAt:"descending"})
    .exec((err,armas)=>{
    if(err){
        return next(err);
    }
    res.render("index",{armas:armas});
    });
    });


router.get("/singup",(req,res)=>{
    res.render("singup");
});

router.get("/armas",(req,res)=>{
res.render("armas");
});

router.post("/singup",(req,res,next)=>{
    var username=req.body.username;
    var password= req.body.password;

Zombie.findOne({username:username},(err,zombie)=>{
if(err){
    return next(err);
}
if(zombie){
    req.flash("error","El nombre de usuario ya lo ha formado otro zombie");
    return res.redirect("/singup");
}
var newZombie = new Zombie({
    username:username,
    password:password
});
newZombie.save(next);
return res.redirect("/");
});
});


router.post("/arma",(req,res,next)=>{
    var descripcion=req.body.descripcion;
    var categoria= req.body.categoria;
    var fuerza= req.body.fuerza;

/*Arma.findOne({descripcion:descripcion},(err,arma)=>{
if(err){
    return next(err);
}
if(arma){
    req.flash("error","El nombre de usuario ya lo ha formado otra arma");
    return res.redirect("/armas");
}*/
var newArma = new Arma({
    descripcion:descripcion,
    categoria:categoria,
    fuerza:fuerza
});
newArma.save(next);
return res.redirect("/");
});

 module.exports=router; 
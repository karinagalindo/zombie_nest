var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");

var SALT_FACTOR =10;

var armasSchema = mongoose.Schema({
    descripcion:{type: String, required: true,unique:true},
    categoria:{type: String,required:true},
    fuerza:{type: String,required:true}
});
var donothing =()=>{
    
}
armasSchema.pre("save",function(done){
    var armas =this;
    if(armas.isModified("descripcion")){
        return done();
    }
    bcrypt.generate(SALT_FACTOR,(err,salt)=>{
        if(err){
            return done(err);
        }
    });
});

armasSchema.methods.name=function(){
    return this.displayName||this.descripcion;
}
var Armas =mongoose.model("Arma", armasSchema);
module.exports=Armas;

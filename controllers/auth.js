const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt"); 
const { accepts } = require("express/lib/request");

async function register (req, res){
    const {firstname, lastname, email, password} = req.body;
    
    
    if(!email)res.status(400).send({msg: "El email es obligatorio"});
    if(!password)res.status(400).send({msg: "la contra es obligatoria"});
    
    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        password,
        role: "user",
        active: false,
    });
    
   const salt = bcrypt.genSaltSync(10);
   const hashPassword = bcrypt.hashSync(password,salt);
   user.password = hashPassword;
  
   

  try{
    await user.save();
    res.status(200).send({msg: "Usuario Guardado"});
  }catch (error){
    res.status(400).send({msg: "Error al crear el usuario"});
  }

}

async function login(req, res){
    const {email,password} = req.body;

    if(!email)res.status(400).send({msg: " El email es obligatorio"});
    if(!password)res.status(400).send({msg: "La contra es obligatoria"});

    const emailLowerCase = email.toLowerCase();
    try{
        const response = await User.findOne({email: emailLowerCase});
        bcrypt.compare(password, response.password, (bcryptError,check) => {

            if(bcryptError){
                res.status(500).send({msg:" Error servidor"});
            }else if (!check){
                res.status(400).send({msg:"Contra incorrecta"});
            }else if(!response.active){ 
                res.status(401).send({msg:"Usuario no autorizado o no activo"});
            }else{
                res.status(200).send({
                    access : jwt.createAccessToken(response),
                    refresh : jwt.createRefreshToken(response)});
            }

        })
    }catch(error){
        res.status(500).send({msg:"Error del Servidor"});
    }
   

};

async function refreshAccessToken(req,res){
    const { token } = req.body;
    if(!token)res.status(400).send({msg:"token requerido"});

    try {
        const { user_id } = jwt.decoded(token); 
        const response = await User.findOne({_id: user_id}).exec();

        if (!response) {
            res.status(500).send({msg: " Error del servidor "});
        } else {
            res.status(200).send({
                access : jwt.createAccessToken(response)
            });
        }
    } catch (error) {
        res.status(500).send({msg: "Servidor Error"})
    }
     
}
   

module.exports = {
    register,
    login,
    refreshAccessToken,
};
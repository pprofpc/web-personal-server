const bcrypt = require('bcryptjs');
const User = require('../models/user');

function register(req, res){
    const{firstname, lastname, email, password} = req.body;
    //console.log("Se ha ejecutado el registro");
    //console.log(req.body);

    if(!email || !password){
        res.status(404).send({ message: "Los datos son obligatorios." });
    }

    const user = new User({
        firstname, 
        lastname, 
        email: email.toLowerCase(),
        role: "user",
        active: false,
        password});

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    user.password = hashPassword;

    user.save((err, userStored) => {
        if(err){
            res.status(500).send({message: "Error, el usuario ya existe: ",err});
        } else {
            if(!userStored){
                res.status(404).send({message: "Error al crear el usuario"});
            } else {
                res.status(200).send({message: "TODO OK", user: userStored});
            }
        }
    })

    console.log(user);

    //res.status(200).send({ msg: "TODO OK" });
}

module.exports = {
    register,
};

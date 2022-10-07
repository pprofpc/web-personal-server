const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user");

function signUp(req, res) {
    const user = new User();

    const { name, lastname, email, password, repeatPassword } = req.body;

    user.name = name;
    user.lastname = lastname;
    user.email = email;
    user.role = "admin";
    user.active = false;

    if (!password || !repeatPassword) {
        res.status(404).send({ messsage: "Las contraseñas son obligatorias." });

    } else {
        if (password !== repeatPassword) {
            res.status(404).send({ message: "Las contraseñas no son iguales." });
        } else {
            bcrypt.hash(password,null,null,function(err,hash){
                if(err){
                    res.status(500).send({message: "Error al encriptar la contraseña"})
                } else {
                    user.password = hash;
                    //res.status(200).send({message: hash})
                    user.save((err, userStored) => {
                        if(err){
                            res.status(500).send({message: "Error, el usuario ya existe: ",err});
                        } else {
                            if(!userStored){
                                res.status(404).send({message: "Error al crear el usuario"});
                            } else {
                                res.status(200).send({user: userStored})
                            }
                        }
                    } )
                }
            })
            //res.status(200).send({ message: "Usuario creado." });
        }
    }
}

module.exports = {
    signUp
};
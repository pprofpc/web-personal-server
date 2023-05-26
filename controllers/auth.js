const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('../utils/jwt');

function register(req, res) {
    const { firstname, lastname, email, password } = req.body;
    //console.log("Se ha ejecutado el registro");
    //console.log(req.body);

    if (!email || !password) {
        res.status(404).send({ message: "Los datos son obligatorios." });
    }

    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: "user",
        active: false,
        password
    });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    user.password = hashPassword;

    user.save((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "Error, el usuario ya existe: ", err });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error al crear el usuario" });
            } else {
                res.status(200).send({ message: "TODO OK", user: userStored });
            }
        }
    })

    console.log(user);

    //res.status(200).send({ msg: "TODO OK" });
}

function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({ message: "Email and password are required." });
      return;
    }
  
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        res.status(500).send({ message: "Internal server error." });
        return;
      }
  
      if (!user) {
        res.status(404).send({ message: "User not found." });
        return;
      }
  
      bcrypt.compare(password, user.password, (bcryptErr, matched) => {
        if (bcryptErr || !matched) {
          res.status(401).send({ message: "Invalid email or password." });
          return;
        }
  
        if (!user.active) {
          res.status(403).send({ message: "User is not active." });
          return;
        }
  
        // const token = jwt.createAccessToken(user);
        res.status(200).send({ message: "Authentication successful." });
      });
    });
  }
  

module.exports = {
    register,
    login
};

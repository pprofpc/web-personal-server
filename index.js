const mongoose = require("mongoose");
const { 
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    IP_SERVER,
    API_VERSION,  } = require("./constants");

    mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`,
(err) => {
    if (err) throw err;

    console.log("La conexión con la BD ha sido exitosa");
}
    );
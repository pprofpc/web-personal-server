const mongoose = require("mongoose");
const app = require('./app');
const PORT_SERVER = process.env.PORT || 3977;
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    IP_SERVER,
    API_VERSION, } = require("./constants");

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`,
    (err) => {
        if (err) throw err;

        else {
            console.log("DB connected :-)");

            app.listen(PORT_SERVER, () => {
                console.log("###############");
                console.log("## API REST ###");
                console.log("###############");
                console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/`);
            });
        }
    }
);
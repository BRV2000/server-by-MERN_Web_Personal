const mongoose = require ("mongoose");  
const {DB_USER,DB_PASSWORD,DB_HOST,API_VERSION,IP_SERVER} = require ("./constants"); 
const app = require ("./app");

const PORT = process.env.POST || 3977;

mongoose.connect(
    `mongodb+srv://${DB_USER}:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}/?retryWrites=true&w=majority`)
    .then(()=> {
        app.listen(PORT,() =>{
            console.log ("######################");
            console.log("###### API REST ######");
            console.log ("######################");
            console.log (`http://${IP_SERVER}:${PORT}/api/${API_VERSION}/`);
        });
    })
    .catch((error) =>{
        console.log("Error al conectar a la Base de Datos");
    });
    
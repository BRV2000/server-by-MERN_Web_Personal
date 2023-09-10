const express  = require( "express");
const bodyParser = require ("body-parser");//analiza y procesa los datos de solicitudes HTTP, como JSON o datos de formulario y que estos sean mas facil de interpretar y utililizar apara Node
const cors = require ("cors");
const {API_VERSION} = require ("./constants");  


const app = express();

//Import routing 
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const menuRoutes = require("./router/menu");
const courseRoutes = require("./router/course");
const postRoutes = require("./router/post");
const newsletterRoutes = require("./router/newslettes");

//Configure Body Parse
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Configure static folder 
app.use(express.static("uploads"));

//Configure Header HTTp / CORSP
app.use(cors());

//Configure routing
app.use(`/api/${API_VERSION}`,authRoutes);
app.use(`/api/${API_VERSION}`,userRoutes);
app.use(`/api/${API_VERSION}`,menuRoutes);
app.use(`/api/${API_VERSION}`,courseRoutes);
app.use(`/api/${API_VERSION}`,postRoutes);
app.use(`/api/${API_VERSION}`,newsletterRoutes);


module.exports = app;

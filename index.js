const express = require("express");
//const session = require("express-session");
const logger = require("morgan");

const {connect}= require("./app/config/database"); //traigo la función de la base de datos.
//importamos las rutas

const users = require("./app/api/routes/user.routes");
const colors = require("./app/api/routes/color.routes");
const palettes = require("./app/api/routes/palette.routes");
const HTTPSTATUSCODE = require("./app/utils/httpStatusCode");
const cors = require("cors");

connect(); //ejecutamos la función.

const app = express();

//configuración de las cabeceras de nuestras respuestas.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

// definimos las direcciones que van a tener permiso para utilizar la API.

  app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true,
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));


  app.use(logger("dev"));



 // Middlewares de enrutado.Definimos las rutas que hemos importado
  app.use("/users", users);
  app.use("/colors", colors);
  app.use("/palettes", palettes);

  //controlando rutas que no coinciden con ninguna de las definidas.
    app.use((req, res, next) => {
    let err = new Error();
    err.status = 404;
    err.message = HTTPSTATUSCODE[404];
    next(err);
  });
  //Para que funcione JWT creamos la secretkey.
  app.set("secretKey", "nodeRestApi");

  //middleware control de errores
  app.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Error inesperado');
  })
  
  app.disable('x-powered-by');//evita que se sepa que la API esta realizada con NODE.
  

  app.listen(3000,()=>{
      console.log("Escuchando mi servidor en el puerto 3000");
  });


import express from "express";
import config from "./config";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import session from "express-session";

require("./passport/local-auth");

import videoRoutes from "./routes/videos.routes";
import userRoutes from "./routes/users.routes";

const server = express();

server.set("port", config.PORT);

server.use(morgan("dev"));
server.use(cors());
server.use(express.json()); //para entender objetos json
server.use(express.urlencoded({ extended: false })); // entender campos que vienen de un formulario
server.use(
  session({
    secret: "secretsession",
    resave: false,
    saveUninitialized: false,
  })
);
//server.use(flash());//flash hace uso de sesiones
server.use(passport.initialize());


server.use(passport.session());
 
 

server.use(userRoutes);
server.use(videoRoutes);



export default server;

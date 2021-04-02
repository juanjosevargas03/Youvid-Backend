import passport from "passport";
import User from "../models/User";
import bcrypt from "bcrypt";
const LocalStrategy = require("passport-local").Strategy;


//almacenar id de usuario en el navegador
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

//recibir id de usuario y buscar en la DB
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);

  done(null, user); //dar al navegador datos del usuario
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req: any, email: string, password: string, done: any) => {

      const userFound = await User.findOne({ email: email });

    if (userFound){
     
      return done(null, false,'The Email already exists');
    } else {
      const user = new User();
      user.email = email;
      user.password = bcrypt.hashSync(password, 10);
      await user.save();
      done(null, user); //datos del usuario autenticado
    }


     
    }
  )
);

passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req: any, email: string, password: string, done: any) => {

      const userFound = await User.findOne({ email: email });

    if (!userFound){
      return done(null, false,'No User found');
    } 

      if(!userFound.comparePassword(password)){
        return done(null, false,'Incorrect Password');

      }
    

    done(null, userFound); //datos del usuario autenticado

    }
  )
);
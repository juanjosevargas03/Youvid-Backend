import { Router, RequestHandler } from "express";
import passport from "passport";
import * as videoCtrl from "./videos.controllers";


const router = Router();

/* export const isAuthenticated: RequestHandler = (req, res, next) => {
    
    if (req.isAuthenticated()) {

        return next();
      }
      
      res.status(204).json();
    
  }; */
  

router.post("/signup", (req, res, next) => {
  passport.authenticate("local-signup", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.statusMessage = info;

      return res.status(204).end();
    }

    user.password = null;
    return res.status(200).json(user);
  })(req, res, next);
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local-signin", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.statusMessage = info;

      return res.status(204).end();
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      user.password = null;
      

      return res.status(200).json(user);
    });
  })(req, res, next);
});

/* router.post("/logout", (req, res, next) => {
  req.logout();
}); */



export default router;

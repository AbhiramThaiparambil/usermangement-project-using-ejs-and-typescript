import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import * as user_controller from "../controller/user_controller";
import * as auth from  "../middleware/auth";
import path from 'path';

const userRoute = express();
import 'express-session';

userRoute.set("view engine", "ejs"); // Set EJS as the default view engine

userRoute.set("views", path.join(__dirname, "../../src/view"));




userRoute.use(
  session({
    secret: "mysitesecretcode",
    resave: true,
    saveUninitialized: false,
  })
);

userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: true }));



userRoute.get("/",auth.isLogout, user_controller.loadRegister);
userRoute.post("/reg",auth.isLogout,user_controller.regRoute); 
userRoute.get("/loginLoad",auth.isLogout,user_controller.Login);
userRoute.post("/login",auth.isLogout,user_controller.login_data);
// userRoute.post('/login',)
userRoute.get("/home", auth.isLogin,user_controller.loadHome);
userRoute.get("/logout", user_controller.logout);


export{
  userRoute
} 

import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import * as user_controller from "../controller/user_controller";
// import * as auth from  "../middleware/auth";
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
// // setting ejs



userRoute.get("/", user_controller.loadRegister);
 //showing first page
userRoute.post("/reg", user_controller.regRoute); //for get value from form
userRoute.get("/loginLoad",  user_controller.Login);
userRoute.post("/login", user_controller.login_data);
// userRoute.post('/login',)
userRoute.get("/home", user_controller.loadHome);
userRoute.get("/logout", user_controller.logout);
// userRoute.get("/edit", auth.isLogin, user_controller.edit);
// userRoute.post('/update',user_controller.update)|

export{
  userRoute
} 

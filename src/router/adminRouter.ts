import express, { Request, Response } from "express";
import nocache from "nocache";
import session from "express-session";
import bodyParser from "body-parser";
import * as adminController from "../controller/admin_controller"; // Use named import
import * as auth from "../middleware/adminAuth";
import path from 'path';
const adminRoute = express();


adminRoute.use(nocache()); 

adminRoute.set("view engine", "ejs"); 
adminRoute.set("views", path.join(__dirname, "../../src/view"));


adminRoute.use(bodyParser.json());
adminRoute.use(bodyParser.urlencoded({ extended: true }));

adminRoute.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  })
);

// Route definitions
adminRoute.get("/adminSignup",auth.isLogout, adminController.adminSignup); // Corrected to adminController
adminRoute.post("/adminreg",auth.isLogout,adminController.regdata);
adminRoute.get("/newuser", auth.isLogin, adminController.newuser);

adminRoute.get("/adminLogin1", auth.isLogout, adminController.adminLoginLoad);
adminRoute.post("/adminlogin", auth.isLogout, adminController.adminLogin);

adminRoute.get("/Adminhome", auth.isLogin,adminController.adminhome);
adminRoute.get("/AdminEdit", auth.isLogin,adminController.edit);
// adminRoute.get("/Adminhome2", adminController.adminhome2);
adminRoute.get("/logoutAdmin", adminController.logout);

adminRoute.post("/addNewuserdata",auth.isLogin, adminController.addnewUserData);
adminRoute.get("/Useredit", auth.isLogin, adminController.useredit);
adminRoute.post("/editedData", auth.isLogin, adminController.editedata);
adminRoute.get("/deletUser", auth.isLogin, adminController.deleteuser);

export {
  adminRoute
} 

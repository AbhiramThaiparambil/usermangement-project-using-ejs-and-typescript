import express from "express";
import path from "path";
import mongoose from "mongoose";
import nocache from "nocache";
import { log } from "console";
import {userRoute} from "./router/userRouter";
import {adminRoute} from "./router/adminRouter";

import { Request, Response } from 'express';


const app = express();





const viewsPath = process.env.NODE_ENV === 'production'
? path.join(__dirname, 'view')  // For production, assuming views are in dist/views
: path.join(__dirname, '../src/view');  // For development, assuming views are in src/views

app.set('view engine', 'ejs');  // Set EJS as the default view engine

app.set('views', path.join(__dirname, '../src/view'));



console.log('--------------------------------------------------------------------------');

console.log(path.join(__dirname,'../src/views'));



const port = 3000;
mongoose.connect("mongodb://localhost:27017/typeScript_userManagement_system");

// public serving
app.use(express.static("public"));

//  route for users
app.use(nocache());

app.use("/",userRoute);
app.use("/",adminRoute);

app.get('/hello', (req:Request, res:Response) => {
  res.render('signUp'); 
});

// server Port
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

// const session = require("express-session");
import User from "../model/userModel"
import bcrypt from "bcrypt";

import { Request, Response } from 'express';



const securepassword = async (password:string) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.error(error);
  }
};

//    first get registration form
const loadRegister = async (req:Request, res:Response):Promise<void> => {
  try {

 res.render('signUp'); 

  } catch (error) {
    console.log(error);
  }
};
//   registration post for get data
const regRoute = async (req:Request, res:Response):Promise<void> => {
  try {
    const { name, email, password } = req.body;

    console.log(name,email,password);
    
    const spassword = await securepassword(password);
   
    const user = new User({
      name,
      email,
      password: spassword,
      is_admin: 0,
      
    });

    const userData = await user.save();

    if (userData) {
      res.redirect("/loginLoad");
    } else {
      res.render("signUp", { message: "try again!!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

// login route

const Login = async (req:Request, res:Response):Promise<void>=> {
  try {
    console.log("hello, this is login route");
    res.render("login");
  } catch (error) {
    console.log(error);
  }
};

// login password gettin

const login_data = async (req:Request, res:Response):Promise<void>=> {
  try {
   
     const {login_email,login_password}=req.body
      let userdata = await User.findOne({ email: login_email });
      
    if (userdata) {
      const passwordMatch = await bcrypt.compare(login_password, userdata.password);
      console.log(passwordMatch);

      if (passwordMatch && userdata.is_admin==0|| 1 ) {
        
          
         
       
        (req.session as any).user_id = userdata._id;

        res.redirect("/home");
      } else {
        res.render("login", { message: "Incorrect email or password" });
      }
    } else {
      res.render("login", { message: "Incorrect email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");

  }
};



const loadHome = async (req:Request, res:Response):Promise<void>=> {
  try {
  

    const userdata = await User.findById(req.session.user_id)

    
    if (userdata) {

        res.render("home", { logindataFromDatabase: userdata });
  
      } else {
  
        res.redirect("/login");
  
      }
   
    
  } catch (error) {
    console.log(error);  
    
  }
};

const logout = async (req:Request, res:Response):Promise<void>=> {
  try {
    if(req.session){
      req.session.destroy((e)=>{
        if(e){
          console.log(e);
          return 
        }
      });

    }
    res.redirect("/loginLoad");
  } catch (error) {
    console.log(error);
  }
};

// const edit = async (req, res) => {
//   try {
//     const id = req.query._id;
//     const userdata = await User.findOne({ _id: id });

//     res.render("edit", { user_data: userdata });

//     if (userdata) {
//       console.log(userdata);
//     } else {
//       console.log("no data");
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const update = async (req, res) => {
//   try {
//     const { update_name, update_email, update_password, update_id } = req.body;
            

//     const updatedUser = await User.findByIdAndUpdate(
//       update_id, // Filter: Finds the user by _id
//       { $set: { name: update_name, email: update_email } } // Update: Sets new values for name and email
//     );


//     if (updatedUser) {

//         console.log("User updated successfully");
  
//         res.redirect("/home");
  
//       } else {
  
//         res.status(404).send("User not found");
  
//       }







//   } catch (error) {
//     console.log(error.message);
//   }
// };

export {
  loadRegister,
  regRoute,
  Login,
  login_data,
  loadHome,
  logout,
  // edit,
  // update,
};

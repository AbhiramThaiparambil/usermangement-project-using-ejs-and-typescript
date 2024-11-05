import session from "express-session";
import Admin from "../model/AdminModel"; // Ensure this model is used correctly.
import bcrypt from "bcrypt";
import User from "../model/userModel";
import { Request, Response } from 'express';

const securePassword = async (password: string) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Error hashing password");
  }
};

const adminLoginLoad = async (req: Request, res: Response): Promise<void> => {
  try {
    res.render('AdminLogin');
  } catch (error) {
    console.error("Error loading admin login:", error);
    res.status(500).send("Internal Server Error");
  }
};

const regdata = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await securePassword(password);

    const newAdmin = new Admin({ 
      name: name,
      email: email,
      password: hashedPassword,
      is_admin: 1,
    });

    const userData = await newAdmin.save();

    if (userData) {
      res.redirect("/");
    } else {
      res.send("Failed to register. Please try again.");
    }
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).send("Internal Server Error");
  }
};

const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { login_email, login_password } = req.body;

    const userFulldata = await User.findOne({ email: login_email });

    if (!userFulldata) {
      return res.render("login", { message: "Email not found" });
    }

    // Check password match
    const passwordMatch = await bcrypt.compare(login_password, userFulldata.password);

    if (passwordMatch) {
      if (userFulldata.is_admin === 1) {
        (req.session as any).admin_id = userFulldata._id;
        return res.redirect("/Adminhome");
      } else {
        return res.render("login", { message: "You are not an admin" });
      }
    } else {
      return res.render("login", { message: "Email or password is incorrect" });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    res.render("login", { message: "An error occurred during login" });
  }
};

const adminhome = async (req: Request, res: Response): Promise<void> => {
  try {
    const userdata ={}
     await User.findById(req.session.admin_id);
    if (!userdata) {
      return res.redirect("/"); // Redirect if no user found
    }
    res.render("AdminHome", { userdata });
  } catch (error) {
    console.error("Error loading admin home:", error);
    res.status(500).send("Internal Server Error");
  }
};

const edit = async (req: Request, res: Response): Promise<void> => {
  try {
    const fulldata_users = await User.find({ });

    res.render("AdminEdit", { user: fulldata_users });
  } catch (error) {
    console.error("Error fetching users for editing:", error);
    res.status(500).send("Internal Server Error");
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.redirect("/");
    });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).send("Internal Server Error");
  }
};

const newuser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.render("AdminNew-userAdd");
  } catch (error) {
    console.error("Error loading new user form:", error);
    res.status(500).send("Internal Server Error");
  }
};

const addnewUserData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nUser_name, nUser_email, nUser_password } = req.body;

    const nUserSPassword = await securePassword(nUser_password);

    const newUser = new User({
      name: nUser_name,
      email: nUser_email,
      password: nUserSPassword,
      is_admin: 0,
    });

    const userData = await newUser.save();

    if (userData) {
      res.redirect("/AdminEdit");
    } else {
      console.error("Failed to save the user. Please try again.");
      res.status(500).send("Failed to save the user. Please try again.");
    }
  } catch (error) {
    console.error("Error adding new user:", error);
    res.status(500).send("An error occurred while saving the user data.");
  }
};

const useredit = async (req: Request, res: Response): Promise<void> => {
  try {
    const _id = req.query._id;
    const ogUsrdata = await User.findById(_id);
    if (!ogUsrdata) {
       res.status(404).send("User not found");
       return 
    }
    res.render("AdminUserEdit", { userData: ogUsrdata });
  } catch (error) {
    console.error("Error fetching user for edit:", error);
    res.status(500).send("Internal Server Error");
  }
};

const editedata = async (req: Request, res: Response): Promise<void> => {
  try {
    const { updatedname, updatedemail, updatepassword, admin, id } = req.body;
    const isAdmin = admin === "1" ? 1 : 0;

    const updateFields: any = {
      name: updatedname,
      email: updatedemail,
      is_admin: isAdmin,
    };

    if (updatepassword) {
      updateFields.password = await securePassword(updatepassword); // Hash the new password if provided
    }

    const updated = await User.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (updated) {
      res.redirect("/AdminEdit");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).send("Server Error");
  }
};

const deleteuser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userDelete = await User.deleteOne({ _id: req.query._id });
    if (userDelete.deletedCount > 0) {
      res.redirect("/AdminEdit");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error");
  }
};

const adminSignup = async (req: Request, res: Response): Promise<void> => {
  try {
    res.render('AdminSignUp');
  } catch (error) {
    console.error("Error loading admin signup:", error);
    res.status(500).send("Internal Server Error");
  }
};

export {
  adminLoginLoad,
  regdata,
  adminLogin,
  adminhome,
  edit,
  logout,
  newuser,
  addnewUserData,
  useredit,
  editedata,
  deleteuser,
  adminSignup
};

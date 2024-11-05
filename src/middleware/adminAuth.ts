import { Request, Response, NextFunction } from 'express';

const isLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.session?.admin_id) { // Optional chaining to check if session exists
      console.log("Admin is logged in, proceeding to the next middleware.");
      return next();
    } else {
      console.log("Admin is not logged in, redirecting to admin login.");
      return res.redirect("/adminlogin1");
    }
  } catch (error) {
    console.error("Error in isLogin middleware:", (error as Error).message);
    return next(error); // Pass the error to the next middleware
  }
};

const isLogout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.session || !req.session.admin_id) {
      console.log("User is logged out, proceeding to the next middleware.");
      return next();
    } else {
      console.log("User already logged in, redirecting to home.");
      return res.redirect("/Adminhome");
    }
  } catch (error) {
    console.error("Error in isLogout middleware:", (error as Error).message);
    return next(error); // Pass the error to the next middleware
  }
};

export {
  isLogin,
  isLogout,
};

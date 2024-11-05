import { Request, Response, NextFunction } from 'express';
import session from 'express-session';

// Middleware
const isLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.session.user_id) {
      console.log("User is logged in, proceeding to the next middleware.");
      return next();
    } else {
      console.log("User is not logged in, redirecting to login page.");
      return res.redirect("/loginLoad");
    }
  } catch (error) {
    console.error("Error in isLogin middleware:", (error as Error).message);
    return next(error); // Pass the error to the next middleware
  }
};

const isLogout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.session.user_id) {
      console.log("User is logged out, proceeding to the next middleware.");
      return next();
    } else {
      console.log("User already logged in, redirecting to home.");
      return res.redirect("/home");
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

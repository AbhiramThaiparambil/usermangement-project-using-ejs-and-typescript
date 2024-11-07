import { Request, Response, NextFunction } from 'express';
import session from 'express-session';

const isLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.session.user_id) {

      return next();
    } else {
      return res.redirect("/loginLoad");
    }
  } catch (error) {
    console.error("Error in isLogin middleware:", (error as Error).message);
    return next(error); 
  }
};

const isLogout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.session.user_id) {
      return next();
    } else {
      return res.redirect("/home");
    }
  } catch (error) {
    return next(error); 
  }
};

export {
  isLogin,
  isLogout,
};

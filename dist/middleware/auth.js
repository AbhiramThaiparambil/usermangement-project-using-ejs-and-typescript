"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogout = exports.isLogin = void 0;
// Middleware
const isLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.session.user_id) {
            console.log("User is logged in, proceeding to the next middleware.");
            return next();
        }
        else {
            console.log("User is not logged in, redirecting to login page.");
            return res.redirect("/loginLoad");
        }
    }
    catch (error) {
        console.error("Error in isLogin middleware:", error.message);
        return next(error); // Pass the error to the next middleware
    }
});
exports.isLogin = isLogin;
const isLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.session.user_id) {
            console.log("User is logged out, proceeding to the next middleware.");
            return next();
        }
        else {
            console.log("User already logged in, redirecting to home.");
            return res.redirect("/home");
        }
    }
    catch (error) {
        console.error("Error in isLogout middleware:", error.message);
        return next(error); // Pass the error to the next middleware
    }
});
exports.isLogout = isLogout;

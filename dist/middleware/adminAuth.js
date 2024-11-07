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
const isLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.admin_id) {
            console.log("Admin is logged in, proceeding to the next middleware.");
            return next();
        }
        else {
            console.log("Admin is not logged in, redirecting to admin login.");
            return res.redirect("/adminlogin1");
        }
    }
    catch (error) {
        console.error("Error in isLogin middleware:", error.message);
        return next(error);
    }
});
exports.isLogin = isLogin;
const isLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.session || !req.session.admin_id) {
            console.log("User is logged out, proceeding to the next middleware.");
            return next();
        }
        else {
            console.log("User already logged in, redirecting to home.");
            return res.redirect("/Adminhome");
        }
    }
    catch (error) {
        console.error("Error in isLogout middleware:", error.message);
        return next(error);
    }
});
exports.isLogout = isLogout;

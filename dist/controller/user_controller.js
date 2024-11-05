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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.loadHome = exports.login_data = exports.Login = exports.regRoute = exports.loadRegister = void 0;
// const session = require("express-session");
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const securepassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        return passwordHash;
    }
    catch (error) {
        console.error(error);
    }
});
//    first get registration form
const loadRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++------------------------------------------------------------------------');
        res.render('signUp');
    }
    catch (error) {
        console.log(error);
    }
});
exports.loadRegister = loadRegister;
//   registration post for get data
const regRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const spassword = yield securepassword(password);
        const user = new userModel_1.default({
            name,
            email,
            password: spassword,
            is_admin: 0,
        });
        const userData = yield user.save();
        if (userData) {
            res.redirect("/loginLoad");
        }
        else {
            res.render("signUp", { message: "try again!!" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
});
exports.regRoute = regRoute;
// login route
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("hello, this is login route");
        res.render("login");
    }
    catch (error) {
        console.log(error);
    }
});
exports.Login = Login;
// login password gettin
const login_data = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login_email, login_password } = req.body;
        let userdata = yield userModel_1.default.findOne({ email: login_email });
        if (userdata) {
            const passwordMatch = yield bcrypt_1.default.compare(login_password, userdata.password);
            console.log(passwordMatch);
            if (passwordMatch && userdata.is_admin == 0 || 1) {
                req.session.user_id = userdata._id;
                res.redirect("/home");
            }
            else {
                res.render("login", { message: "Incorrect email or password" });
            }
        }
        else {
            res.render("login", { message: "Incorrect email or password" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
});
exports.login_data = login_data;
const loadHome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userdata = yield userModel_1.default.findById(req.session.user_id);
        if (userdata) {
            res.render("home", { logindataFromDatabase: userdata });
        }
        else {
            res.redirect("/login");
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.loadHome = loadHome;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.session) {
            req.session.destroy((e) => {
                if (e) {
                    console.log(e);
                    return;
                }
            });
        }
        res.redirect("/loginLoad");
    }
    catch (error) {
        console.log(error);
    }
});
exports.logout = logout;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = __importDefault(require("express"));
const nocache_1 = __importDefault(require("nocache"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const adminController = __importStar(require("../controller/admin_controller")); // Use named import
const auth = __importStar(require("../middleware/adminAuth"));
const path_1 = __importDefault(require("path"));
const adminRoute = (0, express_1.default)();
exports.adminRoute = adminRoute;
adminRoute.use((0, nocache_1.default)());
adminRoute.set("view engine", "ejs");
adminRoute.set("views", path_1.default.join(__dirname, "../../src/view"));
adminRoute.use(body_parser_1.default.json());
adminRoute.use(body_parser_1.default.urlencoded({ extended: true }));
adminRoute.use((0, express_session_1.default)({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
// Route definitions
adminRoute.get("/adminSignup", auth.isLogout, adminController.adminSignup); // Corrected to adminController
adminRoute.post("/adminreg", auth.isLogout, adminController.regdata);
adminRoute.get("/newuser", auth.isLogin, adminController.newuser);
adminRoute.get("/adminLogin1", auth.isLogout, adminController.adminLoginLoad);
adminRoute.post("/adminlogin", auth.isLogout, adminController.adminLogin);
adminRoute.get("/Adminhome", auth.isLogin, adminController.adminhome);
adminRoute.get("/AdminEdit", auth.isLogin, adminController.edit);
// adminRoute.get("/Adminhome2", adminController.adminhome2);
adminRoute.get("/logoutAdmin", adminController.logout);
adminRoute.post("/addNewuserdata", auth.isLogin, adminController.addnewUserData);
adminRoute.get("/Useredit", auth.isLogin, adminController.useredit);
adminRoute.post("/editedData", auth.isLogin, adminController.editedata);
adminRoute.get("/deletUser", auth.isLogin, adminController.deleteuser);

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
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller = __importStar(require("../controller/user_controller"));
const userRoute = (0, express_1.default)();
exports.userRoute = userRoute;
require("express-session");
// userRoute.use(
//   session({
//     secret: "mysitesecretcode",
//     resave: true,
//     saveUninitialized: false,
//   })
// );
// userRoute.use(bodyParser.json());
// userRoute.use(bodyParser.urlencoded({ extended: true }));
// // setting ejs
userRoute.get("/", user_controller.loadRegister);
//showing first page
userRoute.post("/reg", user_controller.regRoute); //for get value from form
userRoute.get("/loginLoad", user_controller.Login);
userRoute.post("/login", user_controller.login_data);
// userRoute.post('/login',)
userRoute.get("/home", user_controller.loadHome);
userRoute.get("/logout", user_controller.logout);

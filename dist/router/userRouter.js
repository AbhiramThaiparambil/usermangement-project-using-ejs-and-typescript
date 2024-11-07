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
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_controller = __importStar(require("../controller/user_controller"));
const auth = __importStar(require("../middleware/auth"));
const path_1 = __importDefault(require("path"));
const userRoute = (0, express_1.default)();
exports.userRoute = userRoute;
require("express-session");
userRoute.set("view engine", "ejs"); // Set EJS as the default view engine
userRoute.set("views", path_1.default.join(__dirname, "../../src/view"));
userRoute.use((0, express_session_1.default)({
    secret: "mysitesecretcode",
    resave: true,
    saveUninitialized: false,
}));
userRoute.use(body_parser_1.default.json());
userRoute.use(body_parser_1.default.urlencoded({ extended: true }));
userRoute.get("/", auth.isLogout, user_controller.loadRegister);
userRoute.post("/reg", auth.isLogout, user_controller.regRoute);
userRoute.get("/loginLoad", auth.isLogout, user_controller.Login);
userRoute.post("/login", auth.isLogout, user_controller.login_data);
// userRoute.post('/login',)
userRoute.get("/home", auth.isLogin, user_controller.loadHome);
userRoute.get("/logout", user_controller.logout);

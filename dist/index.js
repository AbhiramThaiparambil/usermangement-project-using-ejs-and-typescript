"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const nocache_1 = __importDefault(require("nocache"));
const userRouter_1 = require("./router/userRouter");
const adminRouter_1 = require("./router/adminRouter");
const app = (0, express_1.default)();
const port = 3000;
mongoose_1.default.connect("mongodb://localhost:27017/typeScript_userManagement_system");
// public serving
app.use(express_1.default.static("public"));
//  route for users
app.use((0, nocache_1.default)());
app.use("/", userRouter_1.userRoute);
app.use("/", adminRouter_1.adminRoute);
app.get('/hello', (req, res) => {
    res.render('signUp');
});
// server Port
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

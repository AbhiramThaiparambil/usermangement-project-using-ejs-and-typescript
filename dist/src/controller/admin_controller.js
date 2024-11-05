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
exports.adminSignup = exports.deleteuser = exports.editedata = exports.useredit = exports.addnewUserData = exports.newuser = exports.logout = exports.edit = exports.adminhome = exports.adminLogin = exports.regdata = exports.adminLoginLoad = void 0;
const AdminModel_1 = __importDefault(require("../model/AdminModel")); // Ensure this model is used correctly.
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../model/userModel"));
const securePassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        return passwordHash;
    }
    catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Error hashing password");
    }
});
const adminLoginLoad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('AdminLogin');
    }
    catch (error) {
        console.error("Error loading admin login:", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.adminLoginLoad = adminLoginLoad;
const regdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = yield securePassword(password);
        const newAdmin = new AdminModel_1.default({
            name: name,
            email: email,
            password: hashedPassword,
            is_admin: 1,
        });
        const userData = yield newAdmin.save();
        if (userData) {
            res.redirect("/");
        }
        else {
            res.send("Failed to register. Please try again.");
        }
    }
    catch (error) {
        console.error("Error registering admin:", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.regdata = regdata;
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { login_email, login_password } = req.body;
        const userFulldata = yield userModel_1.default.findOne({ email: login_email });
        if (!userFulldata) {
            return res.render("login", { message: "Email not found" });
        }
        // Check password match
        const passwordMatch = yield bcrypt_1.default.compare(login_password, userFulldata.password);
        if (passwordMatch) {
            if (userFulldata.is_admin === 1) {
                req.session.admin_id = userFulldata._id;
                return res.redirect("/Adminhome");
            }
            else {
                return res.render("login", { message: "You are not an admin" });
            }
        }
        else {
            return res.render("login", { message: "Email or password is incorrect" });
        }
    }
    catch (error) {
        console.error("Error during admin login:", error);
        res.render("login", { message: "An error occurred during login" });
    }
});
exports.adminLogin = adminLogin;
const adminhome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userdata = {};
        yield userModel_1.default.findById(req.session.admin_id);
        if (!userdata) {
            return res.redirect("/"); // Redirect if no user found
        }
        res.render("AdminHome", { userdata });
    }
    catch (error) {
        console.error("Error loading admin home:", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.adminhome = adminhome;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fulldata_users = yield userModel_1.default.find({});
        res.render("AdminEdit", { user: fulldata_users });
    }
    catch (error) {
        console.error("Error fetching users for editing:", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.edit = edit;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).send("Internal Server Error");
            }
            res.redirect("/");
        });
    }
    catch (error) {
        console.error("Error during logout:", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.logout = logout;
const newuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render("AdminNew-userAdd");
    }
    catch (error) {
        console.error("Error loading new user form:", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.newuser = newuser;
const addnewUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nUser_name, nUser_email, nUser_password } = req.body;
        const nUserSPassword = yield securePassword(nUser_password);
        const newUser = new userModel_1.default({
            name: nUser_name,
            email: nUser_email,
            password: nUserSPassword,
            is_admin: 0,
        });
        const userData = yield newUser.save();
        if (userData) {
            res.redirect("/AdminEdit");
        }
        else {
            console.error("Failed to save the user. Please try again.");
            res.status(500).send("Failed to save the user. Please try again.");
        }
    }
    catch (error) {
        console.error("Error adding new user:", error);
        res.status(500).send("An error occurred while saving the user data.");
    }
});
exports.addnewUserData = addnewUserData;
const useredit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.query._id;
        const ogUsrdata = yield userModel_1.default.findById(_id);
        if (!ogUsrdata) {
            res.status(404).send("User not found");
            return;
        }
        res.render("AdminUserEdit", { userData: ogUsrdata });
    }
    catch (error) {
        console.error("Error fetching user for edit:", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.useredit = useredit;
const editedata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { updatedname, updatedemail, updatepassword, admin, id } = req.body;
        const isAdmin = admin === "1" ? 1 : 0;
        const updateFields = {
            name: updatedname,
            email: updatedemail,
            is_admin: isAdmin,
        };
        if (updatepassword) {
            updateFields.password = yield securePassword(updatepassword); // Hash the new password if provided
        }
        const updated = yield userModel_1.default.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
        if (updated) {
            res.redirect("/AdminEdit");
        }
        else {
            res.status(404).send("User not found");
        }
    }
    catch (error) {
        console.error("Error updating user data:", error);
        res.status(500).send("Server Error");
    }
});
exports.editedata = editedata;
const deleteuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDelete = yield userModel_1.default.deleteOne({ _id: req.query._id });
        if (userDelete.deletedCount > 0) {
            res.redirect("/AdminEdit");
        }
        else {
            res.status(404).send("User not found");
        }
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.deleteuser = deleteuser;
const adminSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render('AdminSignUp');
    }
    catch (error) {
        console.error("Error loading admin signup:", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.adminSignup = adminSignup;

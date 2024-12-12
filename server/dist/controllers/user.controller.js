import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
    try {
        const { fullname, email, password, contact } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ success: false, msg: "User already exists with this email" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // verification token
        const verificationToken = "Mahadev"; //generateVerification();
        user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            contact: Number(contact),
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });
        // generateToken(res,user);
        // await sendEmailVerificationEmail(email, verificationToken);
        const userWithoutPassword = await User.findOne({ email }).select("-password");
        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }
        // generateToken(res,user)
        user.lastLogin = new Date();
        await user.save();
        //send user without password
        const userWithoutPassword = await User.findOne({ email }).select("-password");
        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.fullname}`,
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server error" });
    }
};
export const verifyEmail = async (req, res) => {
    try {
        const { verificationCode } = req.body;
        const user = await User.findOne({
            verificationToken: verificationCode,
            verificationTokenExpiresAt: { $gt: Date.now() },
        }).select("-password"); //gt means greater than
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification token",
            });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        //send welcome email
        // await sendWelcomeEmail(user.email,user.fullname);
        return res.status(200).json({
            success: true,
            message: "Email verified successfully.",
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server error" });
    }
};
export const logout = async (req, res) => {
    try {
        return res.clearCookie("token").status(200).json({
            success: true,
            message: "Logged Out Successfull",
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server error" });
    }
};
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: true, message: "User dosen't exists"
            });
        }
        ;
        const resetToken = ;
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server error" });
    }
};

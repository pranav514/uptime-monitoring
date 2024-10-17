import { Router} from "express";
import User from "../models/userSchema.js";
import {generateToken } from "../utility/jwtHelper.js";
import { hashPassword,comparePassword } from "../utility/auth.js";


const router = Router();

router.post('/register', async (req,res) => {
    try{
        const {name , email, password} = req.body;
        const hashedPassword =  hashPassword(password);
        console.log(hashPassword);
        const user = new User({name,email,password:hashedPassword});
        await user.save();
        res.status(200).json({user});

    }catch(error){
        res.status(400).json({message : "there was an error while register", error});
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).json({ message: "Register first" });
            return;
        }

        const passwordFromBody = req.body.password?.toString() ?? "";
        
        
        const isPasswordCorrect = comparePassword(passwordFromBody, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Incorrect password" });
        }

        const token = generateToken(user);
        const { password, ...others } = user;
        res.status(200).json({ message: "User logged in successfully", others, token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(400).json({ message: "There was an error while logging in", error });
    }
});

router.post('/logout', async (req, res) => {
    try {
        // Assuming you’re using a cookie to store the JWT
        res.clearCookie('token'); // Replace 'token' with the actual cookie name if different

        // If token is passed via 'Authorization' header, let the client handle token removal
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(400).json({ message: "There was an error while logging out", error });
    }
});


export default router;
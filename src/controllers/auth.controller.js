const User = require("../models/User");
const passwordService = require("../utils/passwordService");
const jwtService = require("../utils/jwtService");
const cookiesService = require("../utils/cookiesService");

class authController {
    static register = async ( req, res) => {
       const { name , email , password , role } = req.body;
       const dulplicateEmail = await User.findOne({ email });
       if(dulplicateEmail) {
           return res.status(400).json({ message: "Email already exists" });
       }
       const hashedPassword = await passwordService.hash(password);
       let user = await User.create({ name , email , password : hashedPassword , role });
       user = user.toObject();

       delete user.password;
       res.status(201).json({ message : "User registered successfully", data : user})

    }

    static login = async ( req, res ) => {
        const { email , password } = req.body;
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message : "Invalid email or password" })
        }
        const isVerified = await passwordService.compare(password, user.password);
        if(!isVerified) {
            return res.status(400).json({ message : "Invalid email or password" })
        }

        const token = jwtService.generateAccessToken({ 
            _id: user._id, 
            email: user.email, 
            role: user.role
        });

         const refreshToken = jwtService.generateRefreshToken({ 
            _id: user._id, 
            email: user.email, 
            role: user.role
        });


        user = user.toObject();
        delete user.password;
        
        cookiesService.setAccessToken(res, token)
        cookiesService.setRefreshToken(res, refreshToken)

        return res.status(200).json({ message : "Login successful", data : user , token }); 
    }

    static logout = async ( req , res) => {
        cookiesService.clearTokens(res);
        return res.status(200).json({ message : "Logout successful" });
    }

    static getProfile = async ( req, res ) => {
        if(!req._user) {
            return res.status(200).json({ "message": "User not found" })
        }
        const user = await User.findById(req._user._id).select("-password");
        return res.status(200).json({ message: "User profile fetched successfully", data: user });
    }

    static refreshToken = async ( req, res) => {
        const refreshToken = cookiesService.getRefreshToken(req);
        if(!refreshToken) {
            return res.status(400).json({ message : "Refresh token not found" })
        }

        const decoded = jwtService.verifyRefreshToken(refreshToken);
        const data = {
            _id: decoded._id,
            email: decoded.email,
            role: decoded.role
        }
        
        const token = jwtService.generateAccessToken(data);
        const newRefreshToken = jwtService.generateRefreshToken(data);

        cookiesService.setAccessToken(res, token);
        cookiesService.setRefreshToken(res, newRefreshToken);

        return res.status(200).json({
            message: "Token refreshed successfully",
            data: { token, newRefreshToken }
        });
    }

}

module.exports = authController;
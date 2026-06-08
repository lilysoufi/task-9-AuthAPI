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

        const token = jwtService.sign({ 
            _id : user._id , 
            email : user.email ,
            role : user.role },
            process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN  });

        user = user.toObject();
        delete user.password;

        cookiesService.setData(res, "accessToken", token);

        return res.status(200).json({ message : "Login successful", data : user , token }); 
    }

    static logout = async ( req , res) => {
        cookiesService.clearData(res, "accessToken");
        return res.status(200).json({ message : "Logout successful" });
    }

    static getProfile = async ( req, res ) => {
        if(!req._user) {
            return res.status(200).json({ "message": "User not found" })
        }
        const user = await User.findById(req._user._id).select("-password");
        return res.status(200).json({ message: "User profile fetched successfully", data: user });
    }

}

module.exports = authController;
const User = require("../models/User");
const cookieService = require("../utils/cookiesService");

class ProtectedController {
    static welcome = async (req, res) => {
        if(!req._user) {
            return res.status(400).json({ message: "User not logged in" });
        }
        const user = await User.findById(req._user._id).select("-password");
        return res.status(200).json({ message : `Welcome ${user.name}!` , data : user })
    }

    static accountSummary = async ( req, res ) => {
       if(!req._user) {
        return res.status(400).json({ message : "User not logged in" })
       }
       const user = await User.findById(req._user._id).select("-password");
       return res.status(200).json({ message : "Account Summary", data : user })
    }

    static overview = async( req, res ) => {
        if(!req._user) {
            return res.status(400).json({ message: "User not logged in" });
        }
        const admin = await User.findById(req._user._id).select("-password");
        const overviewUsers = await User.countDocuments({role : "user"});
        const overviewAdmins = await User.countDocuments({role : "admin"});
        return res.status(200).json({ 
            message : `Overview for admin ${admin.name}`,
            data : { users: overviewUsers, admins: overviewAdmins }
         });
    }

    static usersInfo = async ( req, res )=> {
        if(!req._user) {
            return res.status(400).json({ message: "User not logged in" });
        }
        const admin = await User.findById(req._user._id).select("-password");
        const users = await User.find({role : "user"}).select("-password");
        return res.status(200).json({ message : `Users Information for Admin ${admin.name}`, data : users })
    }

    static deleteUser = async ( req, res ) => {
         const userId = req.params.id; 
           if(!req._user) {
            return res.status(400).json({ message: "User not logged in" });
        }
        const admin = await User.findById(req._user._id).select("-password");
        //console.log("Admin trying to delete user:", admin.name, "User ID to delete:", userId);
        //console.log("Admin ID:", admin._id.toString(), "User ID to delete:", userId);
        if(userId === req._user._id.toString()) {
            return res.status(400).json({ message : "You  cannot delete yourself"})
        } 
        else {
            const user = await User.findById(userId);
            if(!user) {
                 return res.status(404).json({ message : "User not found" })
            }
            const deletedUser = await User.findByIdAndDelete(userId);
            return res.status(200).json({ message : `User deleted successfully by Admin ${admin.name}`, data : deletedUser })
        }
        
    }
}

module.exports = ProtectedController;
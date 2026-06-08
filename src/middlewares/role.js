
const role = (roles) => {
   return (req, res , next ) => {
     if(roles.includes(req._user.role)) {
        next();
     } else {
        return res.status(403).json({
            message: "You don't have permission to access this resource."
        });
     }
   }
}

module.exports = role;
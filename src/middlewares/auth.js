const cookieService = require("../utils/cookiesService");
const jwtService = require("../utils/jwtService");

const auth = ( req, res, next ) => {
    try {
    const token = cookieService.getData(req, "accessToken");
    if (!token) {
        return res.status(403).json({
             message : "Not Authorized" })
    }
    const decoded = jwtService.verify(token);

    req._user = { ...decoded };
 
    next();
    } catch (err) {
        return res.status(403).json({
             message : "Not Authorized",
             error : err.message
            })
    }
}

module.exports = auth;

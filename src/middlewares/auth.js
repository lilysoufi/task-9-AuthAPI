const cookiesService = require("../utils/cookiesService");
const jwtService = require("../utils/jwtService");

const auth = ( req, res, next ) => {
    try {
    const token = cookiesService.getAccessToken(req);
    if (!token) {
        return res.status(403).json({
             message : "Not Authorized" })
    }
    const decoded = jwtService.verifyAccessToken(token);

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

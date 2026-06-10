const cookiesService = require("../utils/cookiesService");
const jwtService = require("../utils/jwtService");

const optionalAuth = ( req, res, next ) => {
    try {
        const token = cookiesService.getAccessToken(req);
        if(token) {
           req._user = { ...jwtService.verify(token) };
        }
    } catch (err) {
        req._user = null;
    }
    next();
}

module.exports = optionalAuth;
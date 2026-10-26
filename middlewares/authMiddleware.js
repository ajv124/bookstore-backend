const jwt = require('jsonwebtoken')
const authMiddleware = (req, res, next) => {
    console.log("Inside Authentication Middleware")
    const token = req.headers['authorization'].split(" ")[1]
    if (token) {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWTSECRET)
            req.payload = jwtResponse.userMail
            next()
        } catch (err) {
            res.status(401).json("Invalid Token...")
        }
    } else {
        res.status(401).json("Not an Authorized user... Token missing!!!")
    }
}
module.exports = authMiddleware
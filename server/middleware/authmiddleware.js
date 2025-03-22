const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authMiddleware = async (req,res,next) => {
    // console.log("Cookies received:", req.cookies);
    const token = req.cookies.taskifyUserToken;
    //console.log(token);

    try{
      if(!token) {
        return res.status(401).json({message: 'new-user'})
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id)

      if(!user) {
        return res.status(404).json({message: "User not found"})
      }

      req.user = user;
      next();

    } catch (error) {
        console.log(error)
        return res.status(401).json({error: "Invalid token"})
    }
    
}

module.exports = authMiddleware;
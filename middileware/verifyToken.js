const jwt = require('jsonwebtoken');


const verifyToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    
   
    if(!authHeader) return res.json({error:"No token provided"});
    
    const token = authHeader.split(' ')[1];
    if(!token) return res.json({error:"Maltformed token"});

    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({error:"Invalid token"});
    }
};
module.exports = verifyToken;
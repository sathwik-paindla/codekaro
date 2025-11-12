const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/User');

exports.loginUser=async(req,res)=>{
     try {
            const { email, password } = req.body;
    
            if (!(email && password)) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide both email and password"
                });
            }
    
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }
    
            const token = jwt.sign(
                { 
                    id: user._id,
                    email: user.email 
                }, 
                process.env.SECRET_KEY, 
                {
                    expiresIn: "2h",
                }
            );
    
            const userResponse = {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            };
    
            res.status(200)
               .json({
                   success: true,
                   message: "Login successful!",
                   user: userResponse,
                   token: token
               });
    
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error during login"
            });
        }
};
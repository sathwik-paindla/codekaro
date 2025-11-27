const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/User');

exports.registerUser=async(req,res)=>{
    try{
    //const firstname=req.body.firstname;
    //const lastname=req.body.lastname;
    //const email=req.body.email;
    //const password=req.body.password;
    //1->get all data from frontend
    const {firstname,lastname,email,password}=req.body;

    //2->checking the data obtained is not NULL
    if(!(firstname && lastname && email && password))
    {
        return res.status(400).send('Please enter all details');
    }

    //3->check user is already present in db
    const existingUser = await User.findOne({ email});

    if(existingUser) {
        return res.status(400).json(
        "User with this email already exists"
         );
    }

    //4->encrypt the password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    //5->save the user in db
    const user=await User.create({
        firstname,
        lastname,
        email,
        password:hashedPassword,
    });

    //6->generating jwt for user
    const token = jwt.sign(
            { 
                id: user._id, 
                email: user.email 
            }, 
            process.env.SECRET_KEY, 
            {
                expiresIn: "1h",
            }
        );
    
    user.token=token;
    user.password=undefined;

    res.status(200).json({
        message:"You have successfully registered",
        user,
        token
    });

    }
    catch(error){
        console.log('Error while registering');
    }

    
};
const express=require('express');
const { DBConnection } = require('./database/db');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const User = require('./models/User');
const { generateFile } = require('./generateFile');

const app = express();

//use of middlewares to accept json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//database connection
DBConnection();

app.get("/", (req, res) => {
    res.status(200).json(
        "Server is running!"
    );
});

app.post("/run",(req,res)=>{
    const {code,language='cpp'}=req.body;
    //default language is cpp if user not selected any language

    if(code===undefined){
        return res.status(400).json({error:"Please provide code"});
    }

    try{
        const filePath = generateFile(language, code);
        //console.log(filePath);
        //const output = await executeCpp(filePath);
        res.status(200).json({filePath});
    }catch(error){
        res.status(500).json({ error: error });
    }

    //res.status(200).json({language,data});
})

app.post("/login", async (req, res) => {
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
});


app.post('/register',async (req,res)=>{
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
        user
    });

    }
    catch(error){
        console.log('Error while registering');
    }

    
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
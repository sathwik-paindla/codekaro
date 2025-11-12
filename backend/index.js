const express=require('express');
const { DBConnection } = require('./database/db');

const cors=require('cors');

const authRoutes=require('./routes/authRoutes');
const codeRoutes=require('./routes/codeRoutes');
const problemRoutes = require('./routes/problemRoutes');



const app = express();

//use of middlewares to accept json and urlencoded data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//database connection
DBConnection();

//Routes
app.use('/api/auth',authRoutes);
app.use('/api/code',codeRoutes);
app.use('/api/problems', problemRoutes);

app.get("/", (req, res) => {
    res.status(200).json(
        "Server is running!"
    );
});


app.listen(4000,()=>{
    console.log("Server is running on port 4000");
})
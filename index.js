const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require('cors');
const path = require('path');
const BlogRoute = require('./src/routes/blogRoutes');
const authRoute = require('./src/routes/authroute');
app.use(cors())
require("dotenv").config()
connectDB();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(authRoute);
app.use(BlogRoute);



app.listen(process.env.port,()=>{
    console.log("Blog-server is running",process.env.port);
})
import express from 'express'
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors'
import dotenv from 'dotenv'
import route from './routes/userRoute.js';


const app = express();
app.use(bodyParser.json())
app.use(cors())
dotenv.config()


const PORT= process.env.PORT || 7000
const URL = process.env.MONGODBURL


mongoose.connect(URL).then(()=>{

    console.log("DB connected successfully");
    app.listen(PORT, ()=> {
        console.log(`Server is running at port:${PORT}`);
        
    })

}).catch(error=>console.log(error));


app.use("/api",route)




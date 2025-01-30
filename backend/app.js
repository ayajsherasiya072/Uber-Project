import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import connectToDb from './db/db.js';
import cookieParser from 'cookie-parser';

connectToDb()
const app=express()
app.use(cors())
dotenv.config(
    {
        path:'./.env'
    }
 )

 app.use(express.json())
 app.use(express.urlencoded({ extended: true }))
 app.use(cookieParser())

// for user
import userRouter from "./routes/user.route.js"
app.use("/api/v1/users",userRouter)

//for captaion-driver
import captainRouter from "./routes/captain.route.js"
app.use("/api/v1/captain",captainRouter)


export default app
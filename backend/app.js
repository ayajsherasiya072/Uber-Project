import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import connectToDb from './db/db.js';

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

import userRouter from "./routes/user.route.js"

app.use("/api/v1/users",userRouter)

export default app
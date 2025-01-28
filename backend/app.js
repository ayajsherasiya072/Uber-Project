import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';

const app=express()
app.use(cors())
dotenv.config(
    {
        path:'./.env'
    }
 )



app.get('/',(req,res)=>{
    res.send('Hello World')
}) 

export default app
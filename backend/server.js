import app from "./app.js";
import http from "http";


const server=http.createServer(app)

app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
})
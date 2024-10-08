import cors from 'cors'
import "dotenv/config"
import cookieParser from 'cookie-parser'
import express from "express"
import userRoutes from './Routes/userRoutes'


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin:process.env.FRONTEND_URL,
        credentials:true
}
))


app.use('/api/user',userRoutes)

app.listen(5000 ,()=>{
    console.log("server is running on 5000 and the database connctd")

})
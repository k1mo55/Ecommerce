import cors from 'cors'
import "dotenv/config"
import cookieParser from 'cookie-parser'
import express from "express"
import userRoutes from './Routes/userRoutes'
import itemsRoutes from './Routes/itemsRoutes'
import commentsRouter from './Routes/commentsRouter'
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
app.use('/api/items',itemsRoutes)
app.use('/api/comments',commentsRouter)

app.listen(5000 ,()=>{
    console.log("server is running on 5000 and the database connctd")

})
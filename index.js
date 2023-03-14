import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './mongodb/connect.js'
import authRoutes from './routes/auth.js';
import hotelRoutes from './routes/hotel.js';
import roomRoutes from './routes/room.js';
import userRoutes from './routes/user.js';


dotenv.config();
const app = express();


app.use(cors());
app.use(express.json({ limit: "40mb"}))

app.use('/api/auth',authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
   const errmsg = err.message || "Something went wrong";
   const errstatus = err.status || 500;
   res.status(errstatus).json({ message: errmsg, success: false, stack: err.stack});
})


const startServer = async () => {
    try{
        connectDb(process.env.CONNECTION_URL);
        app.listen(process.env.PORT, () => {
            console.log("Server Started");
        })
    }catch(err){
        throw err
    }
}

startServer();
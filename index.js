import 'dotenv/config'
import './database/connect.js'
import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.route.js";


const app = express()

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("server on port: " + PORT))
import 'dotenv/config'
import './database/connect.js'
import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.route.js";
import linkRouter from './routes/link.router.js'
import  redirectRouter  from './routes/redirecto.router'

const app = express()

app.use(cookieParser());
app.use(express.json());
app.use('/', redirectRouter)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/links', linkRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("server on port: " + PORT))
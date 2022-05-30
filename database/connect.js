import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.DB_URI);
    console.log('connect to db');
} catch (error) {
    console.log("error" + error);
}
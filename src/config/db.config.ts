import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const connectToDb = async()=>{
    const db_uri = process.env.MONGODB_URL as string;
    try {
        await mongoose.connect(db_uri)
        console.log("Database Connected")
    } catch (error) {
        console.log("Database Error")
    }
}
export default connectToDb
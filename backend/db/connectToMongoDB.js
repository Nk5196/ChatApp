import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("connected to db")
    } catch (error) {
        console.log("error in connecting DB", error.message)
    }
}

export default connectToMongoDB;
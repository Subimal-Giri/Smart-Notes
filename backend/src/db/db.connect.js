import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log(`Database connected !! DB HOST: ${connectionInstance.connection.host}`);
        // console.log(connectionInstance);
    }
    catch (error) {
        console.log("Database connection FAILED:", error);
        process.exit(1);
    }
}


export default connectDb;


import dotenv from "dotenv";
dotenv.config({ path: './.env' });
import connectDB from "./src/db/db.connect.js";
import app from "./src/app.js";


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running at port: ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log("Database connection failed", error);
    })


    
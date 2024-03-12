import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoutes.js";
import productRoute from "./routes/productRoutes.js"

// configure env
dotenv.config();

//connect database
connectDB();

// rest object
const app = express()

//middelwares
app.use(cors())
app.use(express.json())

//routes
app.use("/api/auth", authRoute)
app.use("/api/v1", productRoute)

// port
const PORT = process.env.PORT || 8080

// run server
app.listen(PORT, () =>{
    console.log(
        `The server is running on the port: ${PORT}`.bgCyan.white
        );
})
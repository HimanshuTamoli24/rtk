import express from 'express';
import cors from 'cors';
const app = express();
import DatbaseConnect from './config/db.js';
import dotenv from 'dotenv';
import todoRoutes from "./routes/TodoRoutes.js"
dotenv.config();
app.use(cors(
    {
        origin: "https://reacttodobackend-3pyu.onrender.com",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    }

));
app.options("*", cors()); // Allow preflight requests

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

app.use("/api/v1/", todoRoutes)

DatbaseConnect(String(process.env.MONGODB_URI));
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
export default app
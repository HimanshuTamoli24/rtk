import express from 'express';
import cors from 'cors';
const app = express();
import DatbaseConnect from './config/db.js';
import dotenv from 'dotenv';
import todoRoutes from "./routes/TodoRoutes.js"
dotenv.config();
app.use(cors(
    {
        origin: *,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    }

));
app.options("*", cors()); // Allow preflight requestsQ

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://minetasklist.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use("/api/v1/", todoRoutes)

DatbaseConnect(String(process.env.MONGODB_URI));
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
export default app
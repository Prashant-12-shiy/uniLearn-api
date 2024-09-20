import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mainRouter from "./routes/index.js";
import connectDB from "./db/db.js"

dotenv.config();

const app = express();


app.use(cors({origin: 'http://localhost:3000', credentials: true}));

app.use(express.json())

app.use("/api", mainRouter);

app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

app.listen(process.env.PORT, () => {
    connectDB()
    console.log(`Server is running on port ${process.env.PORT}`);
})
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mainRouter from "./routes/index.js";
import connectDB from "./db/db.js"
import uploadRoute from "./routes/signature.route.js"
import signatureRoutes from "./routes/signature.route.js"

dotenv.config();

const app = express();


const allowedOrigins = [
    'http://localhost:3000', // For local development
    'https://main--unilearnbyprash.netlify.app' // For production
  ];
  
  app.use(cors({
    origin: allowedOrigins,
    // methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add any methods you want to allow
    credentials: true // Include this if you want to allow credentials (cookies, authorization headers)
  }));

app.use(express.json())

app.use("/api", mainRouter);
// app.use('/api', uploadRoute);
app.use('/api', signatureRoutes);

app.get('/', (req, res) => {
    res.send('Hello from the server!');
});

app.listen(process.env.PORT, () => {
    connectDB()
    console.log(`Server is running on port ${process.env.PORT}`);
})
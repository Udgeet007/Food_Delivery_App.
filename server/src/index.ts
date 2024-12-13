import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import userRoute from "./routes/user.route";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

//default middleware for any mernproject
app.use(bodyParser.json({limit:'10mb'}));
app.use(express.urlencoded({extended:true, limit:'10mb'}));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin:"http://localhost5173",
  credentials:true
};
app.use(cors(corsOptions));

//api
app.use("/api/v1/user", userRoute);
//http://localhost:8000/api/v1/user/signup

app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});

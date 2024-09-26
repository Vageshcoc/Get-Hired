import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./Routes/user.route.js"
import companyRoute from "./Routes/company.route.js"
import jobRoute from "./Routes/job.route.js"
import applicationRoute from "./Routes/application.route.js"
import path from "path";

dotenv.config({});

connectDB();
const PORT = process.env.PORT || 8080;
const app = express();

const _dirname = path.resolve();


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
  origin:'http://localhost:5173',
  credentials:true,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
//   next();
// });


app.use(cors(corsOptions));

// const PORT = process.env.PORT || 3000;

// api

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*',(_,res)=> {
  res.sendFile(path.resolve(_dirname, "frontend","dist","index.html"));
})

app.listen(PORT,()=> {
  
  console.log(`Server is running on port ${PORT}`);
})
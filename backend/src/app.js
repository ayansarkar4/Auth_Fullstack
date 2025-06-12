import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
dotenv.config()





const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")) //for static files
app.use(cookieParser())
app.get("/ping", (req, res) => {
    res.send("pong");

})



import userRoutes from "./routes/user.routes.js"; 
import productRoutes from "./routes/products.routes.js";



 app.use("/api/v1/users", userRoutes) //for user routes
 app.use("/api/v1/products", productRoutes) 

export default app;


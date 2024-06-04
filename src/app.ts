import express, { Request, Response, NextFunction, ErrorRequestHandler ,Application } from "express";
import createHttpError from "http-errors";
import morgan from "morgan";
import connectToDb from "./config/db.config"
import {createServer} from "http"
import router from "./routes";
import cors from "cors";

const app: Application = express();

const server = createServer(app);

//Middlewares 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// Db connection
connectToDb()
//logger Middleware

//Routes
app.use("/api/v1",router)

app.use(morgan("dev"))

server.listen(3500, () => { console.log("Server is Running On 3500") })

app.get("/api",(req,res:Response)=>{
    res.send("Hello Typescript!")
})


// app.use((req: Request, res: Response, next: NextFunction)=>{
//     next(new createHttpError.NotFound())
//     console.log("dfgg")
// })


// const errorHandler:ErrorRequestHandler = (err,req,res,next)=>{
//     res.status(err.status|500)
//     res.send({
//         status:err.status || 500,
//         message : err.message
//     })
// }
// app.use(errorHandler)
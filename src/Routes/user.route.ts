import {Request,Response,Express,Router} from "express";

import {Signup,Signin,GetUser,UpdateUser,DeleteUSer} from "../controllers/user.controller";
import {VeriftAccesToken} from "../middlewares/auth.middleware"



const userRouter : Router = Router();



userRouter.post("/signup",Signup)
userRouter.post("/signin",Signin)
userRouter.get("/fetch/:id",VeriftAccesToken,GetUser);
userRouter.patch("/update",VeriftAccesToken,UpdateUser);
userRouter.delete("/delete",VeriftAccesToken,DeleteUSer);

export default userRouter;
import {Router} from "express";

import userRouter from "./Routes/user.route";

const router: Router = Router();

router.use("/user",userRouter);

export default router;
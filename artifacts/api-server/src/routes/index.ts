import { Router, type IRouter } from "express";
import healthRouter from "./health";
import openaiRouter from "./openai/index";
import spotifyRouter from "./spotify/index";
import blogRouter from "./blog/index";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/openai", openaiRouter);
router.use("/spotify", spotifyRouter);
router.use("/blog", blogRouter);

export default router;

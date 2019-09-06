import { NextFunction, Request, Response, Router  } from "express";
import { join } from "path";

const homeRouter: Router = Router();

homeRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(join(__dirname, "/../../client/index.html"));
});

export default homeRouter;

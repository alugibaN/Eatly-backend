import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import { errorLogger, requestLogger } from "./middleware/logger";
import authRouter from "./router/auth";
import { authMiddleware } from "./middleware/auth";
import restaurantRouter from "./router/restaurant";
import dishRouter from "./router/dish";
import profileRoter from "./router/profile";
import { orderRout } from "./router/order";

var cookieParser = require("cookie-parser");
dotenv.config();
const PORT = process.env.PORT || 4200;
const app = express();

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

async function main() {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(cookieParser());
  // app.use(requestLogger);

  app.use("/user", authRouter);
  app.get("/testing", async (req, res) => { throw new Error("Something broke!");});

  app.use("/restaurant", restaurantRouter);
  app.use("/dish", dishRouter);

  app.use(authMiddleware);
  
  app.use("/profile", profileRoter);
  app.use("/order", orderRout)
  app.all("*", (req, res) => {
    res.status(404).json({ message: "Not Found" });
  });

  app.use(errorLogger);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(577).send(`Message ${err.message}`);
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
main();

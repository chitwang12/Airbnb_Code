import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { asyncLocalStorage } from "../utils/helpers/request.helper";

export const attachCorrelationIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Generate a new correlation ID
  const correlationId = uuidv4();
  //Optionally, you can also attach it to the response headers
  //Was doing it incase of Request Response thing , but need another approach that can actually work in the async local storage.
  //   req.headers["x-Correlation-Id"] = correlationId;
  //   console.log("Id attached to the request", req.headers["x-Correlation-Id"]);
  asyncLocalStorage.run({ correlationId : correlationId }, () => {
  next();
})
}
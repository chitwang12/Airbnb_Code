import { Request, Response, NextFunction} from "express";
import { NotFoundError } from "../utils/errors/app.error";
import logger from "../config/logger.config";

export const pingHandler = async (req: Request, res: Response, next:NextFunction) => {
        try {
           logger.info("Ping request Received", {"fileName":"ping.controller.ts", "method":"pingHandler", "line": 8 });
               res.status(200).json({
                 message:"Pong",
              success: true,
                });
        } catch (error) {
           throw new NotFoundError("File not found");
        }
 
}
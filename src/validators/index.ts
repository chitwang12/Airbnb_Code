import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import logger from "../config/logger.config";

/**
 *
 * @param schema - Zod schema to validate the request body
 * @returns - Middlware function to validate the request body
 */
export const validateRequestBody = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info("Validating Request body:", {
        fileName: "index.ts",
        method: "validateRequestBody",
        line: 14,
      });
      await schema.parseAsync(req.body);
      logger.info("Request body is valid", {
        fileName: "index.ts",
        method: "validateRequestBody",
        line: 16,
      });
      next();
    } catch (error) {
      logger.error("Request Body is Invalid", {
        fileName: "index.ts",
        method: "validateRequestBody",
        line: 20,
      });
      //If Valdiation fails
      res.status(400).json({
        message: "Invalid request body",
        success: false,
        error: error,
      });
    }
  };
};

/**
 *
 * @param schema - Zod schema to validate the request params
 * @returns - Middlware function to validate the request params
 */
export const validateQueryParams = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.query);
      console.log("Query Params are valid!!!!");
      next();
    } catch (error) {
      res.status(400).json({
        messsage: "Invalid query params",
        success: false,
        error: error,
      });
    }
  };
};

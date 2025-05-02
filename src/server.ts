import express from "express";
import { serverConfig } from "./config";
import v1Router from "./routers/v1/index.router";
import v2Router from "./routers/v2/index.router";
import { genericErrorHandler } from "./middlewares/error.middleware";
import logger from "./config/logger.config";
import { attachCorrelationIdMiddleware } from "./middlewares/correlation.middleware";
import sequelize from "./db/models/sequelize";
const app = express();

app.use(express.json());

/**
 * Registering all the router and their corresponding routes without app server object.
 */
app.use(attachCorrelationIdMiddleware);
app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);

// After all the routing Middlewares are handled, we can add the error handler middleware
/**
 * Add the error handler middleware
 */
app.use(genericErrorHandler);

app.listen(serverConfig.PORT, async () => {
  logger.info(`Server is Running on PORT ${serverConfig.PORT}`);
  logger.info("Press Ctlr + C to stop the server.", {
    fileName: "server.ts",
    method: "listen",
    line: 27,
  });
  try {
    await sequelize.authenticate(); // Check if the database connection is successful
    logger.info("Database connection has been established successfully.", {
      fileName: "server.ts",
      method: "listen",
      line: 29,
    });
} catch (error) {
    logger.error("Unable to connect to the database:", error, {
      fileName: "server.ts",
      method: "listen",
      line: 32,
    });
  }
});

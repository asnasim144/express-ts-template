import { Server } from "http";
import mongodbConnection from "./config/mongodb";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

async function bootstrap() {
  const server: Server = app.listen(process.env.PORT, async () => {
    console.log(`Running, Port: ${process.env.PORT}`);
    await mongodbConnection();
  });

  const unexpectedErrorHandler = (error: unknown) =>
    server
      ? server.close(() => {
          console.log(`Server closed; Cause: ${error}`);
          process.exit(1);
        })
      : process.exit(1);

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);
}

bootstrap();

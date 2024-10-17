/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { userRoutes } from "./routes/user.routes";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    statusCode: httpStatus.OK,
    success: true,
    message: "property",
    data: null,
  });
});
app.use("/api/v1/user", userRoutes);

app.use(globalErrorHandler.globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;

import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      // parse the environment variable into an array
      const allowedOrigins = process.env.FRONTEND_URLS.split(",");

      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        console.log("pass");
        callback(null, true);
      } else {
        console.log("error");
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (cookies)
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/public/:type/:filename", (req, res) => {
  const { filename } = req.params; // Retrieve the filename from the request parameters
  const filePath = path.resolve("backend/uploads", filename); // Construct the full path to the image
  res.sendFile(filePath);
});

app.use("/api/users", userRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/file", fileRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

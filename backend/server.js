import express from "express";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import errorHandler from "./middleware/error.js";
import logger from "./middleware/logger.js";

const app = express();
const port = process.env.PORT || 3000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(logger);

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listings", listingRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}...`));
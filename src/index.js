import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import categoryRouter from "./Routes/categoriesRoutes.js";
import gamesRouter from "./Routes/gamesRoutes.js";
import customersRouter from "./Routes/customersRoutes.js";
import rentalsRouter from "./Routes/rentalsRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use(categoryRouter);
app.use(gamesRouter);
app.use(customersRouter);
app.use(rentalsRouter);


const port = 4000;
app.listen(port, () => console.log(`Server runing in port ${port}`));
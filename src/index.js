import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { connectionDB } from "../database/db.js";
import categoryRouter from "./Routes/categoriesRoutes.js";
import gamesRouter from "./Routes/gamesRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(categoryRouter);
app.use(gamesRouter);


app.post("/categories", async (req, res) => {

    const {name} = req.body;

    try {
      const newCategorie = await connectionDB.query("INSERT INTO categories (name) VALUES ($1) ", [name]);
      res.send(newCategorie.command);
    } catch (err) {
      console.log(err)
      res.send(err.routine).status(500);
    }
     
    });

const port = 4000;
app.listen(port, () => console.log(`Server runing in port ${port}`));
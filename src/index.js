import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { connectionDB } from "../database/db.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/categories", async (req, res) => {

  try {
    const categories = await connectionDB.query("SELECT * FROM categories");
    res.send(categories.rows);
  } catch (err) {
    console.log(err)
    res.send(err.routine);
  }
   
  });

const port = 4000;
app.listen(port, () => console.log(`Server runing in port ${port}`));
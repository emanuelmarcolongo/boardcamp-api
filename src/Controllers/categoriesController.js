import { connectionDB } from "../../database/db.js";



export async function getCategories (req, res) {
  try {
    const categories = await connectionDB.query("SELECT * FROM categories");
    res.send(categories.rows);
  } catch (err) {
    console.log(err);
    res.send(err.routine);
  }
};

export async function postCategories (req, res)  {
  const { name } = req.body;

  try {
    const newCategorie = await connectionDB.query(
      "INSERT INTO categories (name) VALUES ($1) ",
      [name]
    );
    res.send(newCategorie.command);
  } catch (err) {
    console.log(err);
    res.send(err.routine).status(500);
  }
};

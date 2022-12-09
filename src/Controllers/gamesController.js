import { connectionDB } from "../../database/db.js";

export async function getGames(req, res) {
  try {
    const games = await connectionDB.query("SELECT * FROM games");
    res.send(games.rows);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function postGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  console.log(req.body);

  try {
    const addGame = await connectionDB.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
         VALUES ($1, $2, $3, $4, $5);`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );

    res.sendStatus(201);
  } catch (err) {
    res.send(err).status(500);
  }
}

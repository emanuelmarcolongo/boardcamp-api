import { connectionDB } from "../database/db.js";

export async function getGames(req, res) {
  try {
    const games =
      await connectionDB.query(`SELECT games.*, categories.name AS "categoryName" FROM games 
    JOIN categories 
    ON games."categoryId" = categories.id`);
    return res.send(games.rows);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function postGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  try {
    const addGame = await connectionDB.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
         VALUES ($1, $2, $3, $4, $5);`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );

    return res.sendStatus(201);
  } catch (err) {
    return res.send(err).status(500);
  }
}

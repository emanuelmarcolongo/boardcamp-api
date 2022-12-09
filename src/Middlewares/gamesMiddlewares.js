import { connectionDB } from "../../database/db.js";

export async function postGamesMiddleware(req, res, next) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  try {
    if (!name || !image || stockTotal <= 0 || pricePerDay <= 0) {
      return res.sendStatus(400);
    }

    const categoryIdExists = await connectionDB.query(
      "SELECT * FROM categories WHERE id=$1",
      [categoryId]
    );

    const gameExists = await connectionDB.query(
        "SELECT * FROM games WHERE name=$1",
        [name]
    );

    if(gameExists.rows[0]) {
        return res.sendStatus(409);
    }

    if (!categoryIdExists.rows[0]) {
      return res.sendStatus(400);
    }

  } catch (err) {
    res.sendStatus(500);
  }

  next();
}

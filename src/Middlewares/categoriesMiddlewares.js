import { connectionDB } from "../../database/db.js";

export async function postCategoriesMiddleware(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  try {
    const categorie = await connectionDB.query(
      "SELECT name FROM categories WHERE name=$1",
      [name]
    );

    if (categorie.rows[0]) {
      res.sendStatus(409);
    }
  } catch (err) {
    res.sendStatus(500);
  }
  res.locals.name = name;
  next();
}

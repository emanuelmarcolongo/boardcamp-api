import { connectionDB } from "../database/db.js";

export async function postRentalsMiddleware(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const customer = await connectionDB.query(
      `SELECT * FROM customers WHERE id=$1`,
      [customerId]
    );

    const game = await connectionDB.query(`SELECT * FROM games WHERE id=$1`, [
      gameId,
    ]);

    if (!customer.rows[0]) {
      return res.sendStatus(400);
    }

    if (!game.rows[0]) {
      return res.sendStatus(400);
    }

    if (daysRented < 0) {
      return res.sendStatus(400);
    }

    if (game.rows[0].stockTotal <= 0) {
      return res.sendStatus(400);
    }

    res.locals.game = game.rows[0];
    res.locals.customer = customer.rows[0];
  } catch (err) {
    return res.sendStatus(500);
  }

  next();
}

export async function postRentalsReturnMiddleware(req, res, next) {
  const { id } = req.params;
  try {
    const rentalExists = await connectionDB.query(
      `
        SELECT rentals.*, games."pricePerDay"
         FROM rentals
          JOIN games ON "gameId" = games.id
          WHERE rentals.id = $1
        `,
      [id]
    );

    if (!rentalExists.rows[0]) {
      return res.sendStatus(404);
    }

    if (rentalExists.rows[0].returnDate) {
      return res.sendStatus(400);
    }
    res.locals.rental = rentalExists.rows[0];
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }

  

  next();
}

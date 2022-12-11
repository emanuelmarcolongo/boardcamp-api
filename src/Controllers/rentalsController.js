import dayjs from "dayjs";
import { connectionDB } from "../database/db.js";

export async function postRentalsController(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  const { game } = res.locals;
  const originalPrice = game.pricePerDay * daysRented;
  const rentDate = dayjs().format("YYYY-MM-DD");

  try {
    await connectionDB.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented",
           "returnDate", "originalPrice", "delayFee")
           VALUES ($1, $2,$3,$4, $5,$6,$7)`,
      [customerId, gameId, rentDate, daysRented, null, originalPrice, null]
    );

    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function getRentalsController(req, res) {
  try {
    const rentals = await connectionDB.query(
      `SELECT rentals.*,
       customers.id , customers.name AS "customername", games.id, games.name AS "gameName", games."categoryId", categories.name AS "categoryName"
       FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON "gameId" = games.id 
       JOIN categories ON games."categoryId" = categories.id;`
    );

    return res.send(
      rentals.rows.map((i) => ({
        id: i.id,
        customerId: i.customerId,
        gameId: i.gameId,
        rentDate: i.rentDate,
        daysRented: i.daysRented,
        returnDate: i.returnDate,
        originalPrice: i.originalPrice,
        delayFee: i.delayFee,
        customer: {
          id: i.customerId,
          name: i.customername,
        },
        game: {
          id: i.gameId,
          name: i.gameName,
          categoryId: i.categoryId,
          categoryName: i.categoryName,
        },
      }))
    );
  } catch (err) {
    return res.sendStatus(500);
  }
}

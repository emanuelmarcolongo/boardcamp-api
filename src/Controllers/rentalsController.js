import dayjs from "dayjs";
import { connectionDB } from "../database/db.js";

export async function postRentalsController(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  const { game, customer } = res.locals;
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

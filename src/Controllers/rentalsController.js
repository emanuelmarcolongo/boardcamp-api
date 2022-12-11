import { connectionDB } from "../database/db.js";


export async function postRentalsController (req, res) {
    const{ game, customer} = res.locals;

  //   "customerId"
  //   "gameId"
  //   "rentDate"
  //   "daysRented"
  //   "returnDate"
  //   "originalPrice"
  //   "delayFee"
  try {

  } catch (err) {
    res.sendStatus(500);
  }
    console.log(game)
    return res.send(customer);
}
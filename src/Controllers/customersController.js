import { connectionDB } from "../database/db.js";

export async function getCustomers(req, res) {
  try {
    const customers = await connectionDB.query("SELECT * FROM customers");
    res.send(customers.rows);
  } catch (err) {
    console.log(err);
    res.send(err.routine);
  }
}

export async function getCustomersById(req, res) {
  const { id } = req.params;

  try {
    const customers = await connectionDB.query(
      "SELECT * FROM customers WHERE id=$1",
      [id]
    );

    if (!customers.rows[0]) {
      return res.sendStatus(404);
    }

    return res.send(customers.rows[0]);
  } catch (err) {
    return res.send(err.routine);
  }
}

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const newCustomer = await connectionDB.query(
      `INSERT INTO customers (name, phone, cpf, birthday)
             VALUES ($1, $2, $3, $4)`,
      [name, phone, cpf, birthday]
    );

    return res.send(newCustomer.rows);
  } catch (err) {
    return res.send(err.routine);
  }
}

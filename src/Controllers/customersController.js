import { connectionDB } from "../database/db.js";

export async function getCustomers(req, res) {
  const {cpf} = req.query;

  try {
    if (cpf) {
      const customers = await connectionDB.query(`SELECT * FROM customers WHERE cpf ILIKE $1`, [`${cpf}%`]
      );
      return res.send(customers.rows);
    }

    const customers = await connectionDB.query("SELECT * FROM customers");
    return res.send(customers.rows);
  } catch (err) {
    console.log(err);
    return res.send(err);
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
    await connectionDB.query(
      `INSERT INTO customers (name, phone, cpf, birthday)
             VALUES ($1, $2, $3, $4)`,
      [name, phone, cpf, birthday]
    );

    return res.sendStatus(201);
  } catch (err) {
    return res.send(err.routine);
  }
}

export async function putCustomer(req, res) {
  const { id } = req.params;
  const newCustomerInfo = req.body;
  const { name, phone, cpf, birthday } = req.body;

  const userExists = await connectionDB.query(
    `SELECT * FROM customers WHERE cpf=$1`,
    [newCustomerInfo.cpf]
  );

  if (userExists.rows[0]) {
    if (id == userExists.rows[0].id) {
      await connectionDB.query(
        `UPDATE customers SET name=$1,
            phone=$2, cpf=$3, birthday=$4 WHERE id = $5;`,
        [name, phone, cpf, birthday, id]
      );
      return res.sendStatus(200);
    }

    return res.sendStatus(409);
  }

  await connectionDB.query(
    `UPDATE customers SET name=$1,
        phone=$2, cpf=$3, birthday=$4 WHERE id = $5;`,
    [name, phone, cpf, birthday, id]
  );

  return res.sendStatus(200);
}

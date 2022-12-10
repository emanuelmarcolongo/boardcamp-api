import { connectionDB } from "../database/db.js";



export async function getCustomers (req, res) {
  try {
    const customers = await connectionDB.query("SELECT * FROM customers");
    res.send(customers.rows);
  } catch (err) {
    console.log(err);
    res.send(err.routine);
  }
};

export async function getCustomersById (req, res) {
    const {id} = req.params;
   

    try {
      const customers = await connectionDB.query("SELECT * FROM customers WHERE id=$1", [id]);
      res.send(customers.rows);
    } catch (err) {
      console.log(err);
      res.send(err.routine);
    }
  };
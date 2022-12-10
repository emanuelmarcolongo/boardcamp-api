import { connectionDB } from "../database/db.js";
import { customerModel } from "../Models/customerModels.js";

export async function postCustomerMiddleware(req, res, next) {
const newCustomerInfo = req.body;
  const validation = customerModel.validate(newCustomerInfo, { abortEarly: false });


  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(400).send({ message: errors });
  }

  const userExists = await connectionDB.query(`SELECT * FROM customers WHERE cpf=$1`, [newCustomerInfo.cpf]);

  if(userExists.rows[0]) {
    return res.sendStatus(409);
  }

  next();
}

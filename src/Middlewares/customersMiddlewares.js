import dayjs from "dayjs";
import { connectionDB } from "../database/db.js";
import { customerModel } from "../Models/customerModels.js";

export async function postCustomerMiddleware(req, res, next) {
  const newCustomerInfo = req.body;
  const validation = customerModel.validate(newCustomerInfo, {
    abortEarly: false,
  });

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(400).send({ message: errors });
  }

  const userExists = await connectionDB.query(
    `SELECT * FROM customers WHERE cpf=$1`,
    [newCustomerInfo.cpf]
  );

  if (userExists.rows[0]) {
    return res.sendStatus(409);
  }

  const diff = dayjs().diff(newCustomerInfo.birthday, "day");
  if (diff < 0) {
    return res.sendStatus(400);
  }

  next();
}

export async function putCustomerMiddleware(req, res, next) {
  const newCustomerInfo = req.body;
  const { id } = req.params;

  const validation = customerModel.validate(newCustomerInfo, {
    abortEarly: false,
  });

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(400).send({ message: errors });
  }

  const idExists = await connectionDB.query(
    `SELECT * FROM customers WHERE id=$1`,
    [id]
  );

  console.log(idExists.rows[0]);
  if (!idExists.rows[0]) {
    return res.sendStatus(404);
  }

  next();
}

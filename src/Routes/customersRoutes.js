import { Router } from "express";
import {
  getCustomers,
  getCustomersById,
  postCustomer,
  putCustomer,
} from "../Controllers/customersController.js";
import { postCustomerMiddleware, putCustomerMiddleware } from "../Middlewares/customersMiddlewares.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);
router.post("/customers", postCustomerMiddleware, postCustomer);
router.put("/customers/:id", putCustomerMiddleware, putCustomer);

export default router;

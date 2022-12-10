import { Router } from "express";
import { getCustomers, getCustomersById, postCustomer } from "../Controllers/customersController.js";
import { postCustomerMiddleware } from "../Middlewares/customersMiddlewares.js";


const router = Router();


router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);

router.post("/customers",postCustomerMiddleware, postCustomer);


export default router;
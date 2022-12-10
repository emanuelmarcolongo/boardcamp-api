import { Router } from "express";
import { getCustomers, getCustomersById, postCustomer } from "../Controllers/customersController.js";


const router = Router();


router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);

router.post("/customers", postCustomer);


export default router;
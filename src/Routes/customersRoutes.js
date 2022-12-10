import { Router } from "express";
import { getCustomers, getCustomersById } from "../Controllers/customersController.js";


const router = Router();


router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);

router.post("/customers");


export default router;
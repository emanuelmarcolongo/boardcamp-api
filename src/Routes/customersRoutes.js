import { Router } from "express";
import { getCustomers } from "../Controllers/customersController.js";


const router = Router();


router.get("/customers", getCustomers);
router.post("/customers");


export default router;
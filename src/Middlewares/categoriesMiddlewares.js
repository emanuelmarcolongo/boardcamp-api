import { connectionDB } from "../../database/db.js";

export async function postCategoriesMiddleware (req, res, next) {
    const {name} = req.body;

    if (!name) {
        return res.sendStatus(400);
    }

    res.locals.name = name;
    next();
}
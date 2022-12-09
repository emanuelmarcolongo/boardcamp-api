import { connectionDB } from "../../database/db.js";

export async function getGames (req, res) {
    try {
        const games = await connectionDB.query("SELECT * FROM games");
        res.send(games.rows);
    } catch (err) {
        res.sendStatus(500);
    }
}
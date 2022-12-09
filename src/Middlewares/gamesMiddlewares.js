

export async function postGamesMiddleware( req, res, next) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    if (!name || !image || stockTotal <= 0 || pricePerDay <= 0) {
        return res.sendStatus(400);
    }
}
const URL = require("../models/url");

async function handleGenerateNewUrlShortner(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ error: "url is required" });
    }

    const { nanoid } = await import("nanoid");
    const shortId = nanoid(8);

    await URL.create({
        shortId,
        redirectUrl: body.url,
        visitHistory: []
    });

    return res.json({ id: shortId });
}

module.exports = {
    handleGenerateNewUrlShortner
};
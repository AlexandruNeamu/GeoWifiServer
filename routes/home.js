const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Hello World!").status(200);
    res.send("Welcome to home page of GeoWifi Backend");
});

module.exports = router;

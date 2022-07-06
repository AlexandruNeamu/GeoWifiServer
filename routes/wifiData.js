const router = require("express").Router();
const WifiElement = require("../model/WifiElement");

router.post("/", async (req, res) => {
    console.log("post wifi element");
    const wifiElement = new WifiElement({
        linkSpeed: req.body.linkSpeed,
        frequency: req.body.frequency,
        RSSI: req.body.RSSI,
        SSID: req.body.SSID,
        BSSID: req.body.BSSID,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        time: new Date()
    });
    var wifiElementResponse = {
        linkSpeed: req.body.linkSpeed,
        frequency: req.body.frequency,
        RSSI: req.body.RSSI,
        SSID: req.body.SSID,
        BSSID: req.body.BSSID,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    };

    try {
        const savedWifiElement = await wifiElement.save();
        res.status(200).json(wifiElementResponse);
        console.log(wifiElementResponse);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

module.exports = router;

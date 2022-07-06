const mongoose = require("mongoose");

const BSON = require("bson");

const WifiElementSchema = new mongoose.Schema({
    linkSpeed: {
        type: Number,
        
    },

    frequency: {
        type: Number,
    },
    RSSI: {
        type: Number,
    },
    SSID: {
        type: String,
    },
    BSSID: {
        type: String,
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("WifiElement", WifiElementSchema);

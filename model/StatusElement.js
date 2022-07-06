const mongoose=require('mongoose');

const statusSchema=new mongoose.Schema({
    SSID:String,
    state:String,
    latitude:Number,
    longitude:Number,
    time:Number

});

module.exports=mongoose.model('StatusElement',statusSchema);
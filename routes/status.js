const router=require("express").Router();
const StatusElement=require("../model/StatusElement");

router.get('/',async(req,res)=>{
    var allStatus=[];
    console.log("get all status");
    StatusElement.find({},function(err,status){
        if(err){
            res.send(err).status(400);
        }
        else{
            for(var i=0;i<status.length;i++){
                allStatus.push(status[i]);
            }
            console.log(allStatus);
            res.json(allStatus).status(200);
        }
    }).sort({time:1});
});

router.get('/location',async(req,res)=>{//find element with given latitude and longitude
    StatusElement.find({latitude:req.query.latitude,longitude:req.query.longitude},function(err,status){
        if(err){
            res.send(err).status(400);
        }
        else{
            res.json(status).status(200);
        }
    });
});

router.get('ssid',async(req,res)=>{//find element with given ssid
    var allStatus=[];
    StatusElement.find({SSID:req.query.SSID},function(err,status){
        if(err){
            res.send(err).status(400);
        }
        else{
            for(var i=0;i<status.length;i++){
                allStatus.push(status[i]);
            }
            res.json(allStatus).status(200);
        }
    }).sort({time:1});
});

module.exports=router;
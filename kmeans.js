const kmeans = require('node-kmeans');
const WifiElement = require("./model/WifiElement");
const StatusElement=require("./model/StatusElement");
const mongoose = require("mongoose");


const asyncClusterize = (listOfPoints,numberOfCenters) => {
    return new Promise((resolve, reject) => {
        console.log(numberOfCenters);
        kmeans.clusterize(listOfPoints, numberOfCenters, (err, res) => {
            if (err) {
                reject(err);
               
            } else {
                resolve(res);
            }
        });
    });
}

mongoose.connect("mongodb+srv://nfacs:apaplata3@geowificluster.z0aggdg.mongodb.net/?retryWrites=true&w=majority", () => {
    console.log("connected to db!");
});



async function clusterizare()
{
    const wifiElem=await getWifiElements();
    const numberOfCenters=Math.round(wifiElem.length/10);
    const res=await asyncClusterize(wifiElem,{k:numberOfCenters});
            console.log(res);
            await StatusElement.deleteMany({}).exec();
            let nameofSSID = "";
            for( let i = 0; i < res.length; i++ ) {
                let centroidLatitude=res[i]['centroid'][0];
                let centroidLongitude=res[i]['centroid'][1];
                let RSSISum=0;
                let linkSpeedSum=0;
                for(let j=0;j<res[i]['cluster'].length;j++)
                {
                    let latitudeToCheck=res[i]['cluster'][j][0];
                    let longitudeToCheck=res[i]['cluster'][j][1];
                    const result= await WifiElement.find({latitude:latitudeToCheck,longitude:longitudeToCheck}).exec();
                    RSSISum+=result[0].RSSI;
                    linkSpeedSum+=result[0].linkSpeed;
                    nameofSSID="WifiStudenti";
                }
                linkSpeedSum=linkSpeedSum/res[i]['cluster'].length;
                RSSISum=RSSISum/res[i]['cluster'].length;
                let status="Not enough data";
                if(linkSpeedSum>20 )
                {
                    
                    if(RSSISum<-30 && RSSISum>-50)
                    {
                        status="Maximum signal strength";
                    }
                    else if(RSSISum<-50 && RSSISum>-60)
                    {
                        status="Excellent signal strength";
                    }
                    else if(RSSISum<-60 && RSSISum>-70)
                    {
                        status="Good signal strength";
                    }
                    else if(RSSISum<-70 && RSSISum>-80)
                    {
                        status="Not a strong signal strength";
                    }
                    else if(RSSISum<-80 )
                    {
                        status="Weak signal strength";
                    }
                }
                else if(linkSpeedSum<=20 && linkSpeedSum>0)
                {
                    status="Weak internet connection";
                }
                else if(linkSpeedSum<=0)
                {
                    console.log(linkSpeedSum);
                    status="No internet connection";
                }
                else
                {
                    status="Not enough data";
                }
                let statusElement =new StatusElement({
                    SSID: nameofSSID,
                    state: status,
                    latitude: centroidLatitude,
                    longitude: centroidLongitude,
                    time: res[i]['cluster'].length
                });
                await statusElement.save();
            }
        }
async function getWifiElements()
{
    

    const wifiElements=await WifiElement.find({}).exec();
    return wifiElements.map(wifiElement=>{
        return [wifiElement.latitude,wifiElement.longitude];
        });
}     
(
    async()=>{
    await clusterizare();
}
)();
module.exports=clusterizare;


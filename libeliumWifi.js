// require the scriptr.io´s log module and configure it to the "info" level
var log = require("log");
log.setLevel("info");

try {
    var payload = null;
    // Check if the payload is available in request.parameters
    // (AMQP message) or in request.body (HTTP message)
    payload = JSON.parse(request.body);
    //log.info("HTTP");
    log.info("Received the following payload:\n" + JSON.stringify(payload));
    
    //var sensor_str = JSON.stringify(payload.sensor);
	var sensor = payload.sensor;
    
    //publish("responseChannel2",{"id": "libeliumWifi_id", "result": payload});
    
}

catch(exception){
    log.error("Something went wrong\n" + JSON.stringify(exception));
    }

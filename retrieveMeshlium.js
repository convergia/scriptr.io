// require the scriptr.io´s log module and configure it to the "info" level
var log = require("log");
log.setLevel("info");

try {
    var payload = null;
    // Check if the payload is available in request.parameters
    // (AMQP message) or in request.body (HTTP message)
    if (request.parameters && Object.keys(request.parameters).length > 0) {
        payload = JSON.parse(request.parameters.data)
    	//log.info("AMPQ");
    }
    else {
        payload = JSON.parse(request.body);
        //log.info("HTTP");
        }
    log.info("Received the following payload:\n" + JSON.stringify(payload));
    

    // Just for play with the format data	
    //var sensor_str = JSON.stringify(payload.sensor);
	var sensor = payload.sensor;

	/*
	payload example: 
    {"id":"88142","id_wasp":"MSK_SA","id_secret":"696418FDC337DE58","sensor":"PRES","value":"92867.91","datetime":"2019-05-	29T16:11:20+00:00"}
    
	payload.id
    payload.id_wasp
    payload.id_secret
    payload.sensor
    payload.value
    payload.datetime
	*/    

	// Discriminates the data by type of sensor and put it in dashboard
	if(sensor == "BAT"){
		 publish("responseChannel",{"id": "meshlium_battery", "result": payload});
    }
    else if(sensor == "TC") {
		publish("responseChannel",{"id": "meshlium_temperature", "result": payload});
    }
    else if(sensor == "HUM") {
        publish("responseChannel",{"id": "meshlium_humidity", "result": payload});
    }
    else if(sensor == "PRES") {
        publish("responseChannel",{"id": "meshlium_pression", "result": payload});
    }
    else if(sensor == "SOIL2") {
        publish("responseChannel",{"id": "meshlium_soil2", "result": payload});
    }
    else if(sensor == "PLV1") {
        publish("responseChannel",{"id": "meshlium_plv1", "result": payload});
    }    
	else if(sensor == "PLV2") {
        publish("responseChannel",{"id": "meshlium_plv2", "result": payload});
    }    
    else if(sensor == "PLV3") {
        publish("responseChannel",{"id": "meshlium_plv3", "result": payload});
    }    
	else if(sensor == "ANE") {
        publish("responseChannel",{"id": "meshlium_ane", "result": payload});
    }    
	else if(sensor == "WV") {
        publish("responseChannel",{"id": "meshlium_wv", "result": payload});
    }    

}

catch(exception){
    log.error("Something went wrong\n" + JSON.stringify(exception));
    }

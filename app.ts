///<reference path="typings/index.d.ts"/>

'use strict';

import * as express from "express";

var app = express();

app.get("/ping", function(request, response){
    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.end("Pong");
});



app.listen("3000")
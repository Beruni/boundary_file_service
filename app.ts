///<reference path="typings/index.d.ts"/>

'use strict';

import * as express from "express";
import * as cookieParser from 'cookie-parser'
import * as middleware from './src/middleware'
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});
app.use(cookieParser());

var serviceDiscovery = new middleware.NodeDiscoveryService();
app.use(function(req, res, next) {
  serviceDiscovery.fetchNodeServers(res, next);
});

app.use(function(req, res, next) {
	new middleware.AuthenticationService(req).authenticate(res, next);
});

app.get("/ping", function(request, response){
    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.end("Pong");
});



app.listen("3000")
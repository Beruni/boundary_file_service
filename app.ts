import * as express from "express";
import * as bodyParser from "body-parser";
import * as multer from "multer";
import * as mongoose from 'mongoose';
import * as gridfs from 'gridfs-stream';
import * as fs from 'fs';
import {BoundaryFile} from "./src/models";
import {AuthenticationService} from './src/middleware/authentication_service';
import * as JSONStream from "JSONStream";

var app = express();

app.set('port', process.env.PORT || '3000');
app.set('mongo_host', process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost');

app.use(bodyParser.json());

app.use((req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    next();
});

// var serviceDiscovery = new middleware.NodeDiscoveryService();
// app.use(function(req, res, next) {
//     serviceDiscovery.fetchNodeServers(res, next);
// });
//

app.use(function(req, res, next) {
    new AuthenticationService(req).authenticate(res, next);
});

var uploadConfig = multer({dest: "./uploads"});

app.post("/upload", uploadConfig.single('boundaryFile'), (req:express.Request, res:express.Response) => {
    var userId = req['decoded']['_id'];
    var gfs = gridfs(mongoose.connection.db, mongoose.mongo);
    var writeStream = gfs.createWriteStream();

    var readStream = fs.createReadStream(req.file.path).pipe(JSONStream.parse(""));
    readStream.on("close", ()=> {
        fs.createReadStream(req.file.path).pipe(writeStream);
    });

    readStream.on("error", e => res.status(500).send("Invalid JSON"));

    writeStream.on('close', file => {
        var tags = req.body.tags.split(",");
        new BoundaryFile().save(userId,req.body.title, tags, file._id)
            .then(boundaryFileId => res.status(200).send({fileId: boundaryFileId}));

    });

    writeStream.on('error', e => res.status(500).send("Could not upload file"));

});

app.get("/fetchFiles", function(request, response){
  console.log("headers = ", request['headers'])
})

mongoose.connect('mongodb://' + app.get('mongo_host') + '/beruni_boundary_files');

app.listen(app.get('port'));

import * as express from "express";
import * as bodyParser from "body-parser";
import * as multer from "multer";
import * as mongoose from 'mongoose';
import * as gridfs from 'gridfs-stream';
import * as fs from 'fs';

var app = express();

app.set('port', process.env.PORT || '3000');
app.set('mongo_host', process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost');

app.use(bodyParser.json());

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
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
// app.use(function(req, res, next) {
//     new middleware.AuthenticationService(req).authenticate(res, next);
// });

var uploadConfig = multer({ dest: "./uploads" });

app.post("/upload", uploadConfig.single('boundaryFile'), (req: express.Request, res: express.Response) => {
    var gfs = gridfs(mongoose.connection.db, mongoose.mongo);
    var writeStream = gfs.createWriteStream();

    fs.createReadStream(req.file.path).pipe(writeStream);

    writeStream.on('close', file => res.status(200).send({fileId: file._id}));

    writeStream.on('error', e => res.status(500).send("Could not upload file"));
});

mongoose.connect('mongodb://'+ app.get('mongo_host') +'/beruni_boundary_files');

app.listen(app.get('port'));
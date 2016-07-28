import * as express from "express";
import * as bodyParser from "body-parser";
import * as multer from "multer";

var app = express();

app.set('port', process.env.PORT || '3000');
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

app.post("/upload", uploadConfig.single('upl'), (req: express.Request, res: express.Response) => {
    console.log(req.file);
    res.status(204).end();
});

app.listen(app.get('port'));
import * as mongoose from 'mongoose';
import {Promise} from "es6-promise";


var boundaryFileSchema = new mongoose.Schema({
    "title": String,
    "fileId": String
});


var model = mongoose.model('BoundaryFile', boundaryFileSchema);

export class BoundaryFile {

    save(title:string, fileId:string):Promise<string> {
        var newRecord = new model({"title": title, "fileId": fileId});
        return new Promise<string>((resolve, reject) => {
            newRecord.save((err, file) => resolve(file['_id']));
        });
    }
}
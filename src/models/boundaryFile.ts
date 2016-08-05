import * as mongoose from 'mongoose';
import {Promise} from "es6-promise";


var boundaryFileSchema = new mongoose.Schema({
    "userId" : Object,
    "title"  : String,
    "fileId" : String,
    "tags"   : {type: [String], index: true}
});


boundaryFileSchema.index({"tags" : 1});

var model = mongoose.model('BoundaryFile', boundaryFileSchema);

export class BoundaryFile {
  
    save(userId: Object, title:string, tags: [string] ,fileId:string):Promise<string> {
        var newRecord = new model({"title": title, "fileId": fileId, "tags": tags});
        return new Promise<string>((resolve, reject) => {
            newRecord.save((err, file) => resolve(file['_id']));
        });
    }
}

import * as mongoose from 'mongoose';
import {Promise} from "es6-promise";


var boundaryFileSchema = new mongoose.Schema({
    "user_id" : String,
    "title"  : String,
    "fileId" : String,
    "tags"   : {type: [String], index: true},
    "time" : { type : Date, default: Date.now }
});


boundaryFileSchema.index({"tags" : 1});

var model = mongoose.model('BoundaryFile', boundaryFileSchema);

export class BoundaryFile {
  
    save(userId:string, title:string, tags: [string] ,fileId:string):Promise<string> {
        var newRecord = new model({"user_id":userId, "title": title, "fileId": fileId, "tags": tags});
        return new Promise<string>((resolve, reject) => {
            newRecord.save((err, file) => resolve(file['_id']));
        });
    }

    fetch(userId:string,callback){
        model.find(userId,function (err, files) {
            if(err){
                console.error(err.message);
            }
            callback(files);
        }).sort([['_id', -1]]);
    }

}

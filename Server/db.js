// var mongoClient = require('mongodb').MongoClient();
var config = require('./config');


// module.exports = {

//     db: null,

//     connect: function (done) { //done is callback function

//         if (this.db) return done();

//         mongoClient.connect(config.dbstring, function (err, db) {
//             if (err) {
//                 console.log('Some Error Occured!');
//             }
//             this.db = db;
//             return done(db);
//         });
//     },

//     get: function () { //done is callback function
//         // console.log('db is there!')
//         // return this.db;
//         mongoClient.connect(config.dbstring, function (err, db) {
//             if (err) {
//                 console.log('Some Error Occured!');
//             }
//             return db;
//         });
//     }

// }

const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;


let _db

async function connect(url) {
    try {
        return _db = await MongoClient.connect(config.dbstring);
    } catch (err) {
        throw new Error('Could not connect to Mongo instance' + err);
    }
}

async function get() {
    if (!_db) {
        await connect()
            .then(function (db) {
                _db = db
            });
    }
    return _db;
    // return _db ? _db : await connect().then(db => db);
}

function insertOne(collectionName, document) {
    return new Promise(function (resolve, reject) {
        if (_db && collectionName && Object.keys(document).length != 0) {
            _db.collection(collectionName).insertOne(document, function (err, result) {
                if (err) {
                    reject('Something went wrong! ' + err);
                } else {
                    resolve(result)
                }
            });
        } else {
            reject('Opps! Insufficient Data');
        }
    });
}

function updateDocument(collectionName, document, id) {
    return new Promise(function (resolve, reject) {
        if ('_id' in document) {
            delete document['_id'];
        }
        if (_db && collectionName && Object.keys(document).length != 0) {
            _db.collection(collectionName).updateOne({ "_id": objectId(id) }, { $set: document }, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        } else {
            reject('Opps! Insufficient Data');
        }
    })
}


function remove(collectionName, document) {
    return new Promise(function (resolve, reject) {
        if (_db && collectionName && Object.keys(document).length != 0) {
            _db.collection(collectionName).remove({ _id: document.id }, function (err, result) {
                if (err) {
                    reject('Something went wrong! ' + err);
                } else {
                    resolve(result)
                }
                // console.log('Done');
            });
        } else {
            reject('Opps! Insufficient Data');
        }
    });
}

function getall(collectionName) {
    return new Promise(function (resolve, reject) {
        if (_db) {
            _db.collection(collectionName).find({}).toArray(function (err, items) {
                if (err) reject(err);
                resolve(items);
            });
        } else {
            reject('Conncetion error');
        }
    });
}

// function removeOne(collectionName, document) {
//     if (_db && collectionName) {
//         _db.collection(name).insertOne(document, function (err, result) {
//             if (err) {
//                 console.log('err' + err);
//             }
//             console.log('Done');
//         });
//     }
// }


function close() {
    if (_db) {
        console.log('Closing MongoDB connection.')
        _db.close()
    }
}

module.exports = {
    connect,
    close,
    get,
    insertOne,
    getall,
    updateDocument
}
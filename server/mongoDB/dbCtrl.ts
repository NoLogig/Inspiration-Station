import App from '../app';
import { ICreateResponse, IDatabaseError, IDatabaseResponse, IReadResponse, IUpdateResponse } from './interfaces/index';
import { MongoError, ObjectID } from 'mongodb';

// Database Controll Object
// Everything that operates directly on the database goes here
// i.e. everything that has to do anything with mongodb
// goal is to abstract away MongoDB stuff and localize in one place, so if you want to swap e.g. for a relational DB
// it's not too much effort
// also, don't expose Mongo API directly, but program against an interface (IDatabaseResponse)
export namespace dbCtrl {

  export function read(id: string, collectionName: string, cb: (dbResponse: IDatabaseResponse<IReadResponse>) => void): void {
   
    App.db.collection(collectionName, (err, collection) => {

      if (err) { return cb({ error: err }); }

      collection.findOne({ '_id': new ObjectID(id) }, (innerError, data) => {

        if (innerError) { return cb({ error: innerError }); }

        if (data) {
          return cb({
            error: null,
            data: morphDataOnRetrieval(data)
          });
        }

        return cb({ error: { message: 'not found' }});

      });

    });

  }

  export function readAll(collectionName: string, cb: (dbResponse: IDatabaseResponse<IReadResponse[]>) => void): void {

    App.db.collection(collectionName, (err, collection) => {

      if (err) { return cb({ error: err }); }

      let cursor = collection.find({});

      if (cursor) { 
        return cursor.toArray().then(arr => {
          return cb({
            error: null,
            data: morphDataOnRetrieval(arr)
          });
        }
      )}

      return cb({ error: { message: 'not found' }

      });

    });

  }

  export function readOneByField(fieldName: string, fieldValue: string, collectionName: string, cb: (dbResponse: IDatabaseResponse<IReadResponse>) => void): void {

    App.db.collection(collectionName, (err, collection) => {

      if (err) { return cb({ error: err }); }

      const searchObject = {};
      searchObject[fieldName] = fieldValue;

      collection.findOne(searchObject, (innerError, data) => {

        if (innerError) { return cb({ error: innerError }); }

        if (data) {
          return cb({
            error: null,
            data: morphDataOnRetrieval(data)
          });
        }
        
        return cb({ error: { message: 'not found' } });

      });

    });

  }

  export function create(item: Object, collectionName: string, cb: (dbResp: IDatabaseResponse<ICreateResponse>) => void): void {

    // deep copy object so input doesn't get mutated
    const itemCopy = JSON.parse(JSON.stringify(item));

    App.db.collection(collectionName, (err: MongoError, collection) => {

      if (err) { return cb({ error: mongoErrorToGeneralDbError(err) }); }

      collection.insertOne(itemCopy, (innerError: MongoError, result) => {

        if (innerError) { return cb({ error: mongoErrorToGeneralDbError(innerError) }); }

        return cb({
          error: null,
          data: morphDataOnRetrieval(itemCopy)
        });

      });

    });

  }
  
  export function update(item, collectionName: string, cb: (dbResp: IDatabaseResponse<IUpdateResponse>) => void): void {

    // deep copy object so input doesn't get mutated and morph it to correct storage form
    const itemCopy = morphDataOnStorage(item);

    App.db.collection(collectionName, (err, collection) => {

      if (err) { return cb({ error: mongoErrorToGeneralDbError(err) }); }

      collection.updateOne({ '_id': new ObjectID(itemCopy._id) }, item, (innerError: MongoError, result) => {

        if (innerError) { return cb({ error: mongoErrorToGeneralDbError(innerError) }); }

        return cb({
          error: null,
          data: morphDataOnRetrieval(itemCopy)
        });

      });

    });

  }

  export function remove(id: string, collectionName: string, cb: (dbResp: IDatabaseResponse<any>) => void): void {

    App.db.collection(collectionName, (err, collection) => {

      if (err) { return cb({ error: mongoErrorToGeneralDbError(err) }); }

      collection.deleteOne({ '_id': new ObjectID(id) }, (innerError, result) => {

        if (innerError) { return cb({ error: mongoErrorToGeneralDbError(innerError) }); }

        return cb({ error: null });

      });

    });

  }

  function mongoErrorToGeneralDbError(err: MongoError): IDatabaseError { return { message: err.message }; }

  function morphDataOnRetrieval(data, logme?: boolean) {

    if (!data) { return console.error('No data!'); }

    const dataCopy = JSON.parse(JSON.stringify(data));

    const morphResource = (resource): void => {

      if (typeof resource._id !== 'string') { return resource.uid = resource._id.toHexString(); }

      resource.uid = resource._id;
      delete resource._id;
    };

    if (Array.isArray(dataCopy)) {

      dataCopy.forEach(resource => morphResource(resource) );
      return dataCopy;
    }

    morphResource(dataCopy);

    return dataCopy;
  }

  function morphDataOnStorage(data) {

    const dataCopy = JSON.parse(JSON.stringify(data));
    dataCopy._id = data.uid;
    delete dataCopy.uid;
    return dataCopy;
  }

}

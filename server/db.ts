const DBConfig = require("../config/l2-event-record.json");
const MongoClient = require("mongodb").MongoClient;

function getURL() {
  return DBConfig.db;
}

export class DBClient {
  url: string;

  constructor() {
    this.url = getURL();
  }

  async invokeDB(cb: any) {
    const client = await MongoClient.connect(this.url);
    return cb(client);
  }

  public async getAll(database:string, collection:string) {
    console.log('getAll', database, collection);
    return this.invokeDB(async (client: any) => {
      const db = client.db(database);
      return db.collection(collection).find().toArray();
    });
  }

  public async getRange(database: string, collection: string, start: number, length:number): Promise<Array<any>> {
    console.log('getRange', database, collection, start, length);
    return this.invokeDB(async (client: any) => {
      const db = client.db(database);
      let c = db.collection(collection);
      let cursor = c.find({});
      let r = await cursor.skip(start).limit(length).toArray();
      return r;
    });
  }
}

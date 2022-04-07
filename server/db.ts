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
}

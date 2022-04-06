import { DBClient } from './db';
import express from 'express';
const BridgeJSON = require("solidity/build/contracts/Bridge.json");

const app = express();
const port = 3001;

function main() {
  const client = new (DBClient);

  app.get('/substrate/:collection_name', async (req:any, res:any) => {
    client.getAll('substrate', req.params.collection_name).then((result:any) => {
      res.send(result);
    })
  });

  app.get('/eth/:eid/:ename/', async (req:any, res:any) => {
    const network_id = req.params.eid;
    const address = BridgeJSON.networks[network_id].address;
    const db_name = network_id + address;
    client.getAll(db_name, req.params.ename).then((result:any) => {
      res.send(result);
    })
  });

  app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
  });
}

main();

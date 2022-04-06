import express from "express";

import serverConf from "../config/server.json";
import substrateNode from "../config/substrate-node.json";
import merkleTreeConfig from "../config/merkle-tree-config.json";
import { ethConfigbyRole } from "../config/eth-config";
import { L1ClientRole } from "../src/types";
import { DBClient } from './db';

const BridgeJSON = require("solidity/build/contracts/Bridge.json");

const app = express();
const port = serverConf.port;

function main() {
  const client = new (DBClient);

  app.get("/substrate-node", (req, res) => {
    res.send(JSON.stringify(substrateNode));
  });

  app.get("/merkle-tree-config", (req, res) => {
    res.send(JSON.stringify(merkleTreeConfig));
  });

  app.get("/eth-config/wallet", (req, res) => {
    res.send(JSON.stringify(ethConfigbyRole(L1ClientRole.Wallet)));
  });

  app.get("/eth-config/monitor", (req, res) => {
    res.send(JSON.stringify(ethConfigbyRole(L1ClientRole.Monitor)));
  });

  app.listen(serverConf.port, () => {
    console.log(`server started at http://localhost:${port}`);
  });

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
}

main();

import express from "express";
import * as fs from "fs";
import serverConf from "./config/server.json";
import substrateNode from "./config/substrate-node.json";
import merkleTreeConfig from "./config/merkle-tree-config.json";
import ethConfig from "./config/eth-config";
import walletSecrets from "./config/wallet-secrets.json";
import monitorSecrets from "./config/monitor-secrets.json";

const app = express();
const port = serverConf.port;
const cryptoJS = require("crypto-js");

function encrypt(data: string) {
  let prikey = fs.readFileSync("prikey").toString();
  return cryptoJS.AES.encrypt(data, prikey).toString();
}

function main() {
  app.get("/substrate-node", (req, res) => {
    res.send(JSON.stringify(substrateNode));
  });

  app.get("/merkle-tree-config", (req, res) => {
    res.send(merkleTreeConfig);
  });

  app.get("/eth-config/wallet", (req, res) => {
    res.send(encrypt(JSON.stringify(ethConfig(walletSecrets))));
  });

  app.get("/eth-config/monitor", (req, res) => {
    res.send(encrypt(JSON.stringify(ethConfig(monitorSecrets))));
  });

  app.listen(serverConf.port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
}

main();

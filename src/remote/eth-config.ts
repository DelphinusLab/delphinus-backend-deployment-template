import CryptoENC from "crypto-js/enc-utf8";
import * as fs from "fs";
import { L1ClientRole, ChainConfig } from "../types";

const cryptoJS = require("crypto-js");
const fetch = require("node-fetch");

function decrypt(data: string) {
  let prikey = fs.readFileSync("prikey").toString();
  return cryptoJS.AES.decrypt(data, prikey).toString(CryptoENC);
}

export async function queryEthConfig(
  role: L1ClientRole,
  apiUri: string
): Promise<ChainConfig[]> {
  let uri;
  switch (role) {
    case L1ClientRole.Monitor:
      uri = apiUri + "/eth-config/monitor";
      break;
    case L1ClientRole.Wallet:
      uri = apiUri + "/eth-config/wallet";
  }
  let text = await (await fetch(uri)).text();
  return JSON.parse(decrypt(text)).chains;
}

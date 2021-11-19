const fetch = require("node-fetch");

interface SubstrateNodeConf {
  address: string;
  port: string;
}

export async function querySubstrateNodeConfig(
  apiUri: string
): Promise<SubstrateNodeConf> {
  let uri = apiUri + "/substrate-node";
  return await (await fetch(uri)).json();
}

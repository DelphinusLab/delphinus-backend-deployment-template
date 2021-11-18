interface SubstrateNodeConf {
  address: string,
  port: string,
}

export function querySubstrateNodeConfig(uri: string): Promise<SubstrateNodeConf> {
  throw new Error("not support yet");
}

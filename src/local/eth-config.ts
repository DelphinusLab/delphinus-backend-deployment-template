import { L1ClientRole, ChainConfig, ProviderType } from "../types";
/*
      provider: () => "ws://127.0.0.1:8546",
      close_provider: async (provider: any) => {
        await provider.connection.close();
      },
      provider: () => "ws://127.0.0.1:8746",
      close_provider: async (provider: any) => {
        await provider.connection.close();
      },
*/

const LocalEthConfig = {
  localtestnet1: {
    mongodbUrl: "mongodb://localhost:27017",
    wsSource: "ws://127.0.0.1:8546",
    rpcSource: "http://127.0.0.1:8545",
    privateKey: "",
    deviceId: "15",
    monitorAccount: "0x6f6ef6dfe681b6593ddf27da3bfde22083aef88b",
    chainName: "localtestnet1",
    l2Account: "//Alice",
    providerType: ProviderType.WebsocketProvider,
    enabled: true,
  },
  localtestnet2: {
    mongodbUrl: "mongodb://localhost:27017",
    rpcSource: "http://127.0.0.1:8745",
    wsSource: "ws://127.0.0.1:8746",
    privateKey: "",
    monitorAccount: "0x6f6ef6dfe681b6593ddf27da3bfde22083aef88b",
    deviceId: "16",
    chainName: "localtestnet2",
    l2Account: "//Alice//stash",
    providerType: ProviderType.WebsocketProvider,
    enabled: true,
  },
};

export async function getLocalEthConfig(
  role: L1ClientRole
): Promise<ChainConfig[]> {
  return [LocalEthConfig.localtestnet1, LocalEthConfig.localtestnet2];
}

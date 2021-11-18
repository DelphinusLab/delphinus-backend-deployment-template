import { L1ClientRole, ChainConfig, ProviderType } from "../types";
const monitorSecrets = require("./monitor-secrets.json");
const walletSecrets = require("./wallet-secrets.json");

/*
      provider: () =>
        new HDWalletProvider({
          privateKeys: [secrets.accounts.deployer.priv],
          providerOrUrl: http_provider(
            "https://bsc.getblock.io/testnet/?api_key=" + secrets.getblock_key
          ),
          shareNonce: false,
        }),
      close_provider: async (provider: any) => {
        await provider.engine.stop();
      },

      provider: () =>
        new HDWalletProvider({
          privateKeys: [secrets.accounts.deployer.priv],
          providerOrUrl: http_provider(
            "https://ropsten.infura.io/v3/" + secrets.infura_id
          ),
          shareNonce: false,
        }),
      close_provider: async (provider: any) => {
        await provider.engine.stop();
      },
*/

const EthConfig = {
  bsctestnet: (secrets: any) => {
    return {
      chainName: "bsctestnet",
      mongodbUrl: "mongodb://localhost:27017",
      rpcSource:
        "https://bsc.getblock.io/testnet/?api_key=" + secrets.getblock_key,
      wsSource:
        "wss://bsc.getblock.io/testnet/?api_key=" + secrets.getblock_key,
      privateKey: secrets.accounts.deployer.priv,
      monitorAccount: "0x6f6ef6dfe681b6593ddf27da3bfde22083aef88b",
      deviceId: "97",
      l2Account: "//Alice//stash",
      providerType: ProviderType.HDWalletProvider,
      enabled: true,
    };
  },
  ropsten: (secrets: any) => {
    return {
      chainName: "ropsten",
      mongodbUrl: "mongodb://localhost:27017",
      rpcSource: "https://ropsten.infura.io/v3/" + secrets.infura_id,
      wsSource: "wss://ropsten.infura.io/ws/v3/" + secrets.infura_id,
      privateKey: secrets.accounts.deployer.priv,
      monitorAccount: "0x6f6ef6dfe681b6593ddf27da3bfde22083aef88b",
      deviceId: "3",
      l2Account: "//Alice",
      providerType: ProviderType.HDWalletProvider,
      enabled: true,
    };
  },
};

export async function queryEthConfig(
  role: L1ClientRole,
  uri: string
): Promise<ChainConfig[]> {
  let configs = [EthConfig.bsctestnet, EthConfig.ropsten];
  // TODO: request configs from restful API
  switch (role) {
    case L1ClientRole.Monitor:
      return configs.map((config) => config(monitorSecrets));
    case L1ClientRole.Wallet:
      return configs.map((config) => config(walletSecrets));
  }
}

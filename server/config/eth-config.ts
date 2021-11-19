import { ProviderType } from "../../src/types";

const EthConfig = (secrets: any) => {
  return {
    chains: [
      {
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
      },
      {
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
      },
    ],
  };
};

export default EthConfig;

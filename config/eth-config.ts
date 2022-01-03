import monitorSecret from "./monitor-secrets.json";
import walletSecret from "./wallet-secrets.json";
import { L1ClientRole } from "../src/types";

const dev = false;
const testnet = true;

const EthConfig = (secrets: any) => {
  return [
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
      enabled: testnet,
      isSnap: false,
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
      enabled: testnet,
      isSnap: true,
    },
    {
      mongodbUrl: "mongodb://localhost:27017",
      wsSource: "ws://127.0.0.1:8546",
      rpcSource: "http://127.0.0.1:8545",
      privateKey: "",
      deviceId: "15",
      monitorAccount: "0x6f6ef6dfe681b6593ddf27da3bfde22083aef88b",
      chainName: "localtestnet1",
      l2Account: "//Alice",
      enabled: dev,
      isSnap: true,
    },
    {
      mongodbUrl: "mongodb://localhost:27017",
      rpcSource: "http://127.0.0.1:8745",
      wsSource: "ws://127.0.0.1:8746",
      privateKey: "",
      monitorAccount: "0x6f6ef6dfe681b6593ddf27da3bfde22083aef88b",
      deviceId: "16",
      chainName: "localtestnet2",
      l2Account: "//Alice//stash",
      enabled: dev,
      isSnap: false,
    },
  ];
};

export function ethConfigbyRole(role: L1ClientRole) {
  switch (role) {
    case L1ClientRole.Wallet:
      return EthConfig(walletSecret);
    case L1ClientRole.Monitor:
      return EthConfig(monitorSecret);
  }
}

// TODO refactor: remove the placeholder parameter
export const WalletSnap = EthConfig(walletSecret).filter(config => config.enabled && config.isSnap)[0].deviceId;

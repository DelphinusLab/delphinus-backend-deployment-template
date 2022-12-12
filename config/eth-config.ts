import monitorSecret from "./monitor-secrets.json";
import walletSecret from "./wallet-secrets.json";
import { L1ClientRole, ChainConfig } from "../src/types";

const dev = false;
const testnet = true;

const EthConfig = (secrets: any) => {
  return [
    {
      chainName: "bsctestnet",
      mongodbUrl: "mongodb://localhost:27017",
      syncEventsStep: 100000,
      bufferBlocks: 0,
      gasWarningAmount: "1",
      nativeCurrency: {
        name: "Test Binance Coin",
        symbol: "tBNB", // 2-6 characters long
        decimals: 18,
      },
      blockExplorer: "https://testnet.bscscan.com",
      //rpcSource:
      //"https://data-seed-prebsc-1-s1.binance.org:8545",
      rpcSource: "https://rpc.ankr.com/bsc_testnet_chapel/" + secrets.ankr_id, //ankr is only for monitor reading, for deployment, please use the above common bsc rpc source.
      wsSource: "wss://rpc.ankr.com/bsc_testnet_chapel/ws/" + secrets.ankr_id,
      privateKey: secrets.accounts.deployer.priv,
      monitorAccount: "0x4D9A852e6AECD3A6E87FecE2cA109780E45E6F2D",
      deviceId: "97",
      l2Account: "//Smith",
      enabled: testnet,
      isSnap: false,
    },
    {
      chainName: "goerli",
      mongodbUrl: "mongodb://localhost:27017",
      syncEventsStep: 100000, //default step 0: sync to latest directly
      bufferBlocks: 0,
      gasWarningAmount: "1",
      nativeCurrency: {
        name: "Goerli ETH",
        symbol: "GoETH", // 2-6 characters long
        decimals: 18,
      },
      blockExplorer: "https://goerli.etherscan.io",
      //rpcSource:
      //"https://goerli.infura.io/v3/" + secrets.infura_id_goerli,
      rpcSource: "https://rpc.ankr.com/eth_goerli/" + secrets.ankr_id, //ankr is only for monitor reading, for deployment, please use the above infura rpc source.
      wsSource: "wss://rpc.ankr.com/eth_goerli/ws/" + secrets.ankr_id,
      privateKey: secrets.accounts.deployer.priv,
      monitorAccount: "0x4D9A852e6AECD3A6E87FecE2cA109780E45E6F2D",
      deviceId: "5",
      l2Account: "//Frank",
      enabled: testnet,
      isSnap: true,
    },
    {
      chainName: "cronostestnet",
      mongodbUrl: "mongodb://localhost:27017",
      syncEventsStep: 2000,
      bufferBlocks: 0,
      gasWarningAmount: "20",
      nativeCurrency: {
        name: "Test Cronos",
        symbol: "tCRO", // 2-6 characters long
        decimals: 18,
      },
      blockExplorer: "https://testnet.cronoscan.com",
      rpcSource: "https://cronos-testnet-3.crypto.org:8545",
      wsSource: "wss://cronos-testnet-3.crypto.org:8546",
      privateKey: secrets.accounts.deployer.priv,
      monitorAccount: "0x4D9A852e6AECD3A6E87FecE2cA109780E45E6F2D",
      deviceId: "338",
      l2Account: "//Cindy//stash",
      enabled: testnet,
      isSnap: false,
    },
    {
      chainName: "rolluxtestnet",
      mongodbUrl: "mongodb://localhost:27017",
      syncEventsStep: 20000,
      bufferBlocks: 0, //rollux take about 40 mins to generate new block so set it to 0
      gasWarningAmount: "1",
      nativeCurrency: {
        name: "Test Syscoin",
        symbol: "tSYS", // 2-6 characters long
        decimals: 18,
      },
      blockExplorer: "https://testnet.rollux.com",
      rpcSource: "https://testnet.rollux.com:2814/",
      wsSource: "",
      privateKey: secrets.accounts.deployer.priv,
      monitorAccount: "0x4D9A852e6AECD3A6E87FecE2cA109780E45E6F2D",
      deviceId: "2814",
      l2Account: "//Richard",
      enabled: testnet,
      isSnap: false,
    },
    {
      mongodbUrl: "mongodb://localhost:27017",
      syncEventsStep: 0,
      wsSource: "ws://127.0.0.1:8546",
      rpcSource: "http://127.0.0.1:8545",
      privateKey: "",
      deviceId: "15",
      monitorAccount: "0x4D9A852e6AECD3A6E87FecE2cA109780E45E6F2D",
      chainName: "localtestnet1",
      l2Account: "//Alice",
      enabled: dev,
      isSnap: true,
    },
    {
      mongodbUrl: "mongodb://localhost:27017",
      syncEventsStep: 0,
      rpcSource: "http://127.0.0.1:8745",
      wsSource: "ws://127.0.0.1:8746",
      privateKey: "",
      monitorAccount: "0x4D9A852e6AECD3A6E87FecE2cA109780E45E6F2D",
      deviceId: "16",
      chainName: "localtestnet2",
      l2Account: "//Alice//stash",
      enabled: dev,
      isSnap: false,
    },
  ];
};

export function ethConfigbyRole(role: L1ClientRole): ChainConfig[] {
  switch (role) {
    case L1ClientRole.Wallet:
      let walletConfig = EthConfig(walletSecret);
      //modify RPC Sources for wallet to be public endpoints
      walletConfig.forEach((config) => {
        config.rpcSource =
          walletSecret.rpcSources[
            config.chainName as keyof typeof walletSecret.rpcSources
          ];
      });
      return walletConfig;
    case L1ClientRole.Monitor:
      return EthConfig(monitorSecret);
  }
}

// TODO refactor: remove the placeholder parameter
export const WalletSnap = EthConfig(walletSecret).filter(
  (config) => config.enabled && config.isSnap
)[0].deviceId;

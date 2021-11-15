import { provider } from "web3-core";

/* We should using local secrets instead of debuggin secrets */
import { Secrets } from "./secrets";
import { WalletSecrets } from "./wallet-secrets";

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3WsProvider = require("web3-providers-ws");
const Web3HttpProvider = require("web3-providers-http");

const ws_options = {
  timeout: 30000, // ms

  clientConfig: {
    // Useful if requests are large
    maxReceivedFrameSize: 100000000, // bytes - default: 1MiB
    maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

    // Useful to keep a connection alive
    keepalive: true,
    keepaliveInterval: 60000, // ms
  },

  // Enable auto reconnection
  reconnect: {
    auto: true,
    delay: 5000, // ms
    maxAttempts: 5,
    onTimeout: true,
  },
};

const http_options = {
  keepAlive: false,
  timeout: 20000, // milliseconds,
  withCredentials: false,
};

const ws_provider = (url: string) => {
  let p = new Web3WsProvider(url, ws_options);
  return p;
};

const http_provider = (url: string) => {
  return new Web3HttpProvider(url, http_options);
};

export interface ChainConfig {
  provider: (_: void) => any;
  close_provider: (provider: provider) => Promise<void>;
  mongodb_url: string;
  ws_source: string;
  rpc_source: string;
  device_id: string;
  monitor_account: string;
  chain_name: string;
  l2_account: string;
}

export const EthConfig: Record<string, (secret: any) => ChainConfig> = {
  localtestnet1: () => {
    return {
      provider: () => "ws://127.0.0.1:8546",
      close_provider: async (provider: any) => {
        await provider.connection.close();
      },
      mongodb_url: "mongodb://localhost:27017",
      ws_source: "ws://127.0.0.1:8546",
      rpc_source: "ws://127.0.0.1:8545",
      device_id: "15",
      monitor_account: "0x6f6ef6dfe681b6593ddf27da3bfde22083aef88b",
      chain_name: "localtestnet1",
      l2_account: "//Alice",
    };
  },
  localtestnet2: () => {
    return {
      provider: () => "ws://127.0.0.1:8746",
      close_provider: async (provider: any) => {
        await provider.connection.close();
      },
      mongodb_url: "mongodb://localhost:27017",
      rpc_source: "http://127.0.0.1:8745",
      ws_source: "ws://127.0.0.1:8746",
      monitor_account: "0x6f6ef6dfe681b6593ddf27da3bfde22083aef88b",
      device_id: "16",
      chain_name: "localtestnet2",
      l2_account: "//Alice//stash",
    };
  },
  bsctestnet: (secrets: any) => {
    return {
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
      mongodb_url: "mongodb://localhost:27017",
      rpc_source:
        "https://bsc.getblock.io/testnet/?api_key=" + secrets.getblock_key,
      ws_source:
        "wss://bsc.getblock.io/testnet/?api_key=" + secrets.getblock_key,
      monitor_account: "0x6f6ef6dfe681b6593ddf27da3bfde22083aef88b",
      device_id: "97",
      chain_name: "bsctestnet",
      l2_account: "//Alice//stash",
    };
  },
  ropsten: (secrets: any) => {
    return {
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
      mongodb_url: "mongodb://localhost:27017",
      rpc_source: "https://ropsten.infura.io/v3/" + secrets.infura_id,
      ws_source: "wss://ropsten.infura.io/ws/v3/" + secrets.infura_id,
      monitor_account: "0x6f6ef6dfe681b6593ddf27da3bfde22083aef88b",
      device_id: "3",
      chain_name: "ropsten",
      l2_account: "//Alice",
    };
  },
};

export const EthConfigEnabled = [
  EthConfig["localtestnet1"],
  EthConfig["localtestnet2"],
].map((config) => config(Secrets));

export const EthConfigAll = [
  EthConfig["localtestnet1"],
  EthConfig["localtestnet2"],
  EthConfig["bsctestnet"],
  EthConfig["ropsten"],
].map((config) => config(Secrets));

export const MerkleTreeDbUri = "mongodb://localhost:27017/";

export const SubstrateNodeConfig = {
  address: "ws://127.0.0.1",
  port: "9944",
};

// export const snap = "15";
//snap: "3"
export const WalletSnap = "15";

const WalletEthConfigEnabledForWallet = [
  EthConfig["localtestnet1"],
  EthConfig["localtestnet2"],
  EthConfig["bsctestnet"],
  EthConfig["ropsten"]
].map((config) => config(WalletSecrets));

export function walletConfigByChainId(chainId: string) {
  return WalletEthConfigEnabledForWallet.find(
    (config) => config.device_id === chainId
  )!;
}

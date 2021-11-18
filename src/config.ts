/* We should using local secrets instead of debuggin secrets */
import { getLocalEthConfig } from "./local/eth-config";
import { local } from "./switch";
import { L1ClientRole } from "./types";
import { queryEthConfig } from "./remote/eth-config";
import { getLocalMerkleTreeDbUri } from "./local/merkle-tree-config";
import { queryMerkleTreeDbUri } from "./remote/merkle-tree-config";
import { getLocalSubstrateNodeConfig } from "./local/substrate-node-config";
import { querySubstrateNodeConfig } from "./remote/substrate-node-config";

/*
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3WsProvider = require("web3-providers-ws");
const Web3HttpProvider = require("web3-providers-http");
*/

const restfulAPIUri = "undefined";

/*
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
*/

// export const snap = "15";
//snap: "3"
export const WalletSnap = "15";

/*
 * =========================== Eth Config ===========================
 */

export async function getEthConfigs(role: L1ClientRole) {
  return local ? getLocalEthConfig(role) : queryEthConfig(role, restfulAPIUri);
}

export async function getEnabledEthConfigs(role: L1ClientRole) {
  let configs = await getEthConfigs(role);
  return configs.filter((config) => config.enabled);
}

export async function getConfigByChainName(
  role: L1ClientRole,
  chainName: string
) {
  let allConfigs = await getEthConfigs(role);
  let config = allConfigs.find((config) => config.chainName === chainName);
  if (config !== undefined) {
    return config;
  } else {
    throw new Error("chain name is not matched.");
  }
}

export async function getConfigByChainId(role: L1ClientRole, chainId: string) {
  let allConfigs = await getEthConfigs(role);
  let config = allConfigs.find((config) => config.deviceId === chainId);
  if (config !== undefined) {
    return config;
  } else {
    throw new Error("chain id is not matched.");
  }
}

/*
 * =============================== L2 ===============================
 */

export async function getSubstrateNodeConfig() {
  return local
    ? getLocalSubstrateNodeConfig()
    : querySubstrateNodeConfig(restfulAPIUri);
}

/*
 * =============================== DB ===============================
 */

export function getMerkleTreeDbUri() {
  return local
    ? getLocalMerkleTreeDbUri()
    : queryMerkleTreeDbUri(restfulAPIUri);
}

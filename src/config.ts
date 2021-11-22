import { local, restfulAPIUri } from "./config/server";
import { L1ClientRole } from "./types";
import { getLocalMerkleTreeDbUri } from "./local/merkle-tree-config";
import { getLocalSubstrateNodeConfig } from "./local/substrate-node-config";
import { getLocalEthConfig } from "./local/eth-config";
import { queryMerkleTreeDbUri } from "./remote/merkle-tree-config";
import { querySubstrateNodeConfig } from "./remote/substrate-node-config";
import { queryEthConfig } from "./remote/eth-config";
import { getLocalL2EventRecorderDbUri } from "./local/l2-event-recorder";
import { queryL2EventRecorderDbUri } from "./remote/l2-event-recorder";

/*
 * ========================= Wallet Config =========================
 */

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

export function getL2EventRecorderDbUri() {
  return local
    ? getLocalL2EventRecorderDbUri()
    : queryL2EventRecorderDbUri(restfulAPIUri);
}
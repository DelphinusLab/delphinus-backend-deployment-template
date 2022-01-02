import { local, restfulAPIUri } from "./config/server";
import { L1ClientRole } from "./types";
import { queryEthConfig } from "./remote/eth-config";

import merkleTreeConfig from "../config/merkle-tree-config.json";
import substrateNodeConfig from "../config/substrate-node.json";
import l2EventRecordConfig from "../config/l2-event-record.json";
import { ethConfigbyRole } from "../config/eth-config";

async function fetchJson(uri: string) {
  return await (await fetch(uri)).json();
}

/*
 * ========================= Wallet Config =========================
 */

export const WalletSnap = "15";

/*
 * =========================== Eth Config ===========================
 */

export async function getEthConfigs(role: L1ClientRole) {
  return local ? ethConfigbyRole(role) : queryEthConfig(role, restfulAPIUri);
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

export async function getSubstrateNodeConfig() {
  let uri = restfulAPIUri + "/substrate-node";
  return local ? substrateNodeConfig : fetchJson(uri);
}

export function getMerkleTreeDbUri() {
  let uri = restfulAPIUri + "/merkle-tree-config";
  return local ? merkleTreeConfig : fetchJson(uri);
}

export function getL2EventRecorderDbUri() {
  let uri = restfulAPIUri + "/l2-event-recorder";
  return local ? l2EventRecordConfig : fetchJson(uri);
}

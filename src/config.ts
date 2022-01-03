import { local, restfulAPIUri } from "./config/server";
import { ChainConfig, L1ClientRole } from "./types";

import merkleTreeConfig from "../config/merkle-tree-config.json";
import substrateNodeConfig from "../config/substrate-node.json";
import l2EventRecordConfig from "../config/l2-event-record.json";
import { ethConfigbyRole, WalletSnap as ConfigWalletSnap } from "../config/eth-config";

const fetch = require("node-fetch");

async function fetchJson(uri: string) {
  return await (await fetch(uri)).json();
}

/*
 * ========================= Wallet Config =========================
 */

export const WalletSnap = ConfigWalletSnap;

/*
 * =========================== Eth Config ===========================
 */

async function queryEthConfig(
  role: L1ClientRole,
  apiUri: string
): Promise<ChainConfig[]> {
  let uri;
  switch (role) {
    case L1ClientRole.Monitor:
      uri = apiUri + "/eth-config/monitor";
      break;
    case L1ClientRole.Wallet:
      uri = apiUri + "/eth-config/wallet";
  }
  return (await fetchJson(uri)).chains;
}

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

export async function getMerkleTreeDbUri() {
  let uri = restfulAPIUri + "/merkle-tree-config";
  return local ? merkleTreeConfig : fetchJson(uri);
}

export async function getL2EventRecorderDbUri() {
  let uri = restfulAPIUri + "/l2-event-recorder";
  return local ? l2EventRecordConfig : fetchJson(uri);
}

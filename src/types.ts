export enum L1ClientRole {
  Monitor,
  Wallet,
}

export enum ProviderType {
  WebsocketProvider,
  HDWalletProvider,
  HttpProvider,
}

export interface ChainConfig {
  chainName: string;
  mongodbUrl: string;
  wsSource: string;
  rpcSource: string;
  privateKey: string;
  deviceId: string;
  monitorAccount: string;
  l2Account: string;
  providerType: ProviderType;
  enabled: boolean;
}

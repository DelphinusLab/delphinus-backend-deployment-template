export const contractsInfo = require("./contracts-info.json");

export const Chains : Record<string, string> = {
    "15": "local-test-net1",
    "16": "local-test-net2",
    "3":  "ropsten",
    "97":  "bsctestnet",
    "338": "cronostestnet",
    "2814": "rolluxtestnet"
}

export const extraTokens = [
  {
    chainId: "97",
    name: "usdt",
    wei: 18,
    address: "337610d27c682E347C9cD60BD4b3b107C9d34dDd"
  },
  {
    chainId: "97",
    name: "usdc",
    wei: 18,
    address: "64544969ed7EBf5f083679233325356EbE738930"
  },
  {
    chainId: "3",
    name: "usdt",
    wei: 6,
    address: "110a13FC3efE6A245B50102D2d79B3E76125Ae83"
  },
  {
    chainId: "3",
    name: "usdc",
    wei: 6,
    address: "07865c6E87B9F70255377e024ace6630C1Eaa37F"
  },
  {
    chainId: "338",
    name: "usdt",
    wei: 18,
    address: "2AA588de227D0B5EF5775dB992ff7f2Fe82cf067"
  },
  {
    chainId: "338",
    name: "usdc",
    wei: 6,
    address: "c21223249CA28397B4B6541dfFaEcC539BfF0c59"
  }
]

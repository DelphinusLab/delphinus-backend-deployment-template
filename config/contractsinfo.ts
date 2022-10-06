export const contractsInfo = require("./contracts-info.json");

export const Chains : Record<string, string> = {
    "15": "local-test-net1",
    "16": "local-test-net2",
    "5":  "goerli",
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
    chainId: "338",
    name: "usdt",
    wei: 6,
    address: "E912124f1204208e3EBA49BAbe3Fc1028351808d"
  },
  {
    chainId: "338",
    name: "usdc",
    wei: 6,
    address: "374AC6edeE4385411FF36BEf74D2c1723bD7A6e8"
  }
]

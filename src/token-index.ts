import { local } from "./switch";

const tokenIndex = require("./local/token-index.json");

export function getTokenIndex(): Record<string, number> {
  if (local) {
    return tokenIndex;
  } else {
    throw new Error("Not support yet.");
  }
}

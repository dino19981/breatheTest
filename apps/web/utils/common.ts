import { BigNumber } from "bignumber.js";

export type Numberish = string | number | bigint | BigNumber;
export type NumberFormatter = (val: Numberish) => string;

export function bn(val: Numberish): BigNumber {
  return new BigNumber(val.toString());
}

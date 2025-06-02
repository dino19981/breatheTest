import { FormUrlParams } from "../types/breathSocket.types";

export function formUrl({ record, resampleFrom, url }: FormUrlParams): string {
  return `${url}?record=${record}&resample_from=${resampleFrom}`;
}

import { IPackageJSONConfig } from "./interfaces.js";

export const isPackageJSONConfig = (
  value: unknown
): value is IPackageJSONConfig =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value) &&
  Object.hasOwn(value, "version");

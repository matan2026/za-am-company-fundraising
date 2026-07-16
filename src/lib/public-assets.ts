import { existsSync } from "node:fs";
import { resolve, sep } from "node:path";
import type { ApprovedImageAsset } from "@/config/assets";

const publicRoot = resolve(process.cwd(), "public");

export function publicAssetExists(publicPath: string) {
  if (!publicPath.startsWith("/images/")) return false;

  const absolutePath = resolve(publicRoot, publicPath.slice(1));
  return absolutePath.startsWith(`${publicRoot}${sep}`) && existsSync(absolutePath);
}

export function existingAsset(asset: ApprovedImageAsset | null) {
  return asset && publicAssetExists(asset.src) ? asset : null;
}

export function existingAssets(assets: readonly ApprovedImageAsset[]) {
  return assets.filter((asset) => publicAssetExists(asset.src));
}

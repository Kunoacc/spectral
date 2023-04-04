import type { AssetTree, Assets } from "@/interfaces/asset.interface";

/**
 * This function converts a flat array of objects into an object with nested children
 * it maps the id on elements of the array to the parentId of other elements
 */

export function convertToNested(array: Assets): AssetTree {
  // define a new map to store the elements of the array with their id as key
  const dictionary = new Map<number, AssetTree>();

  for (const asset of array) {
    dictionary.set(asset.id, {
      ...asset,
      children: [],
      isChild: asset.parentId !== null,
    });
  }

  // step through the array again and add the children to their parents
  for (const asset of array) {
    if (asset.parentId) {
      const parent = dictionary.get(asset.parentId);
      if (parent) {
        parent.children.push({
          ...asset,
          children: dictionary.get(asset.id)?.children || [],
        });
        dictionary.set(asset.parentId, parent);
      }
    }
  }

  // filter for the elements without parents
  const rootElements: AssetTree[] = Array.from(dictionary.values()).filter((asset) => !asset.isChild);

  // create a fake parent for the root elements and return it
  return {
    id: 0,
    name: "root",
    children: rootElements,
  };
}
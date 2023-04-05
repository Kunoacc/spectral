import type { AssetTreeMeasurements } from "./aggregateMeasurements";

/**
 * This function traverses the data supplied in search of the node id supplied
 * @param data The data to traverse
 * @param id The id of the node to find
 */
export function traverseData(data: AssetTreeMeasurements, id: number): AssetTreeMeasurements | null {
  if (data.id === id) {
    return data;
  }
  if (data.children) {
    const children = data.children as AssetTreeMeasurements[];
    for (let i = 0; i < children.length; i++) {
      const node = traverseData(children[i], id);
      if (node) {
        return node;
      }
    }
  }
  return null;
}
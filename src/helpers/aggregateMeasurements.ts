import type { Asset, Assets, AssetTree } from "@/interfaces/asset.interface";
import type { Measurements, Measurement } from "@/interfaces/measurements.interface";
import { format } from "date-fns";
import { convertToNested } from "./convertToNested";

export type AssetMeasurements = Asset & {
  measurements?: Measurement['measurements'];
}

export type AssetTreeMeasurements = AssetTree & {
  measurements: Measurement['measurements'];
}

/**
 * This function takes an array of measurements, groups them by the dates and combines them by their assetId
 */
export function combineAssetsAndMeasurements(assets: Assets, measurements: Measurements) {
  const combinedMeasurements = assets.map((asset) => {
    const combinedAssetMeasurements: AssetMeasurements = {
      ...asset,
      measurements: groupByDate(measurements.filter((measurement) => measurement.assetId === asset.id)[0]?.measurements || {})
    }
    return combinedAssetMeasurements;
  })

  // convert the flat array to a nested object
  const nestedAssets = convertToNested(combinedMeasurements) as unknown as AssetTreeMeasurements;
  return nestedAssets;
}

/**
 * this function takes an asset and returns a new object with the measurements of the asset and its children
 * @param assetMeasurement 
 * @param parentId 
 * @param sum 
 * @param value 
 * @returns 
 */
export function aggregateMeasurements(
  assetMeasurement: AssetTreeMeasurements,
) {
  // handle edgecase of asset having children but no measurements
  if (assetMeasurement?.children?.length && !assetMeasurement?.measurements?.size) {
    console.error('Asset has children but no measurements')
  }

  // handle edgecase of asset having no children but measurements
  if (!assetMeasurement?.children?.length && !assetMeasurement?.measurements?.size) {
    console.error('Asset has no children and no measurements')
  }

  if (assetMeasurement?.measurements?.size) {
    return assetMeasurement.measurements
  };

  // if the asset has children, but no measurements of its own, we need to sum the measurements of its children
  if (assetMeasurement?.children?.length) {
    const newAggregateMeasurements = new Map();
    const children = assetMeasurement.children as AssetTreeMeasurements[];
    for (const child of children) {
      if (child.measurements) {
        // if the child has measurements, we need to add them to the map
        const childAssetMeasurements = aggregateMeasurements(child) as Map<any, any>;
        for (const [date, occurences] of childAssetMeasurements.entries()) {
          if (newAggregateMeasurements.has(date)) {
            const currentValue = newAggregateMeasurements.get(date);
            newAggregateMeasurements.set(date, currentValue as number + occurences);
          } else {
            newAggregateMeasurements.set(date, occurences);
          }
        }
      }
    }
    return newAggregateMeasurements
  }
  return new Map();
}

/**
 * this function takes a measurementValues object and groups them by the month and year
 * @param measurementValues 
 * @returns 
 */
function groupByDate(measurementValues: Measurement['measurements']) {
  const newMeasurements = new Map();

  for (const date in measurementValues) {
    const parsedDate = new Date(date);
    const key = format(parsedDate, 'MMM yyyy');
    if (newMeasurements.has(key)) {
      const keyValue = parseInt(newMeasurements.get(key));
      newMeasurements.set(key, keyValue + measurementValues.get(date));
    } else {
      // @ts-ignore
      newMeasurements.set(key, measurementValues[date]);
    }
  }

  return newMeasurements;
}
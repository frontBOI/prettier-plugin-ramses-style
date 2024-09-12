import {
  CreateLabelArgs,
  GetLabelsArgs,
  GetStatArgs,
  GetTrackingArgs,
  SearchPointRelaisArgs,
  SearchZipCodesArgs,
} from '../../../types/args'

import {
  GetLabelsValues,
  GetTrackingValues,
  SearchPointRelayValues,
  SearchZipCodesValues,
} from './../../../types/values.d'

import { executeApiCall } from './lib/utils'

/**
 * Searches for postal codes based on the search criteria.
 * @param args - parameters necessary for the API call. Refer to the Typescript type for more information.
 * @returns The list of postal codes that match the search criteria.
 * */
export async function searchZipCodes(args) {
  const result = await executeApiCall(args, 'WSI2_RechercheCP', outputXML)
  return result.Liste.Commune
}

/**
 * Searches for relay points based on the search criteria.
 * @param args - parameters necessary for the API call. Refer to the Typescript type for more information.
 * @returns The list of relay points that match the search criteria.
 * */
export async function searchPointsRelais(args) {
  const result = await executeApiCall(args, 'WSI4_PointRelais_Recherche', outputXML)
  return result.PointsRelais.PointRelais_Details
}

/**
 * Creates an etiquette using the Mondial Relay API.
 * @param args - parameters necessary for the API call. Refer to the Typescript type for more information.
 * @deprecated Use the API v2 function instead - see {@link [createShipment](../createShipment/index.ts)}.
 * */
export async function createLabel(args) {
  return await executeApiCall(args, 'WSI2_CreationEtiquette', outputXML)
}

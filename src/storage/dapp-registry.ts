import {
  DappRegistry,
  getDappRegistryEnvironmentConfig,
  Environments,
} from "@fairdatasociety/fdp-contracts-js";
import { Bee } from "@ethersphere/bee-js";
import { BeeSon } from "@fairdatasociety/beeson";
import { utils, BigNumber } from "ethers";
import { Dapp, DappSchema, LocalDapp } from "../model/Dapp";
import { toUtf8Bytes } from "ethers/lib/utils";
import { DappRecord } from "@fairdatasociety/fdp-contracts-js/build/types/model/dapp-record.model";

const dappRegistry = new DappRegistry(
  getDappRegistryEnvironmentConfig(
    import.meta.env.VITE_ENVIRONMENT === "GOERLI"
      ? Environments.GOERLI
      : Environments.LOCALHOST
  )
);

const bee = new Bee(import.meta.env.VITE_BEE_URL);

export function hashDappUrl(url: string): string {
  return utils.keccak256(toUtf8Bytes(url));
}

export async function registerDapp(url: string, record: Dapp): Promise<void> {
  const beesonRecord = new BeeSon({ json: record });

  const { reference } = await bee.uploadData(
    import.meta.env.VITE_BATCH_ID,
    beesonRecord.serialize(),
    { encrypt: false }
  );

  await dappRegistry.createRecord(`0x${reference}`, hashDappUrl(url));
}

export async function getDapp(swarmLocation: string): Promise<LocalDapp> {
  const data = await bee.downloadData(swarmLocation.substring(2));

  const deserializedBeeson = (await BeeSon.deserialize(data)) as BeeSon<Dapp>;

  const dappSchema = new BeeSon({ json: DappSchema });

  // Checks data schema
  dappSchema.json = deserializedBeeson.json;

  const dapp = deserializedBeeson.json as LocalDapp;

  dapp.hash = swarmLocation;

  return dapp;
}

export async function getDapps(
  start: number,
  length: number
): Promise<LocalDapp[]> {
  const recordHashes = await dappRegistry.getRecordSlice(
    BigNumber.from(start),
    BigNumber.from(length)
  );

  const records = await dappRegistry.getRecords(recordHashes);

  return (
    await Promise.all(
      records.map(async (record) => {
        try {
          return await getDapp(record.location);
        } catch (error) {
          console.warn(error);

          return Promise.resolve(undefined);
        }
      })
    )
  ).filter((dapp) => Boolean(dapp)) as LocalDapp[];
}

export async function getValidatedRecords(): Promise<
  Record<string, DappRecord>
> {
  const records = await dappRegistry.getValidatedRecords(
    import.meta.env.VITE_FDP_ADDRESS as string
  );

  return records.reduce((map, dapp) => {
    map[dapp.location] = dapp;
    return map;
  }, {} as Record<string, DappRecord>);
}

export default dappRegistry;

import {
  DappRegistry,
  getDappRegistryEnvironmentConfig,
  Environments,
  RecordHash,
} from "@fairdatasociety/fdp-contracts-js";
import { Bee, Reference } from "@ethersphere/bee-js";
import { BeeSon } from "@fairdatasociety/beeson";
import { utils, BigNumber } from "ethers";
import { Dapp, DappSchema, LocalDapp } from "../model/Dapp";
import { toUtf8Bytes } from "ethers/lib/utils";
import { DappRecord } from "@fairdatasociety/fdp-contracts-js/build/types/model/dapp-record.model";

const dappRegistry = new DappRegistry(
  getDappRegistryEnvironmentConfig(
    import.meta.env.VITE_ENVIRONMENT === "LOCALHOST"
      ? Environments.LOCALHOST
      : Environments.SEPOLIA
  )
);

const bee = new Bee(import.meta.env.VITE_BEE_URL);

export function hashDappUrl(url: string): string {
  return utils.keccak256(toUtf8Bytes(url));
}

async function uploadRecord(record: Dapp): Promise<Reference> {
  const beesonRecord = new BeeSon({ json: record });

  const { reference } = await bee.uploadData(
    import.meta.env.VITE_BATCH_ID,
    beesonRecord.serialize(),
    { encrypt: false }
  );

  return reference;
}

export async function registerDapp(url: string, record: Dapp): Promise<void> {
  const reference = await uploadRecord(record);

  await dappRegistry.createRecord(`0x${reference}`, hashDappUrl(url));
}

export async function editDapp(
  recordHash: RecordHash,
  record: Dapp
): Promise<void> {
  const reference = await uploadRecord(record);

  await dappRegistry.editRecord(recordHash, `0x${reference}`);
}

export async function downloadDapp(
  recordHash: RecordHash,
  swarmLocation: string,
  edited: boolean,
  averageRating?: number,
  numberOfRatings?: number
): Promise<LocalDapp> {
  const data = await bee.downloadData(swarmLocation.substring(2));

  const deserializedBeeson = (await BeeSon.deserialize(data)) as BeeSon<Dapp>;

  const dappSchema = new BeeSon({ json: DappSchema });

  // Checks data schema
  dappSchema.json = deserializedBeeson.json;

  const dapp = deserializedBeeson.json as LocalDapp;

  dapp.hash = recordHash;
  dapp.location = swarmLocation;
  dapp.edited = edited;
  dapp.averageRating = averageRating;
  dapp.numberOfRatings = numberOfRatings;

  return dapp;
}

export async function getDapp(recordHash: RecordHash): Promise<LocalDapp> {
  const record = await dappRegistry.getRecord(recordHash);

  const [averageRating, numberOfRatings] = await Promise.all([
    dappRegistry.getAverageRating(record.location),
    dappRegistry.getNumberOfRatings(record.location),
  ]);

  return downloadDapp(
    record.recordHash,
    record.location,
    record.edited,
    averageRating,
    numberOfRatings.toNumber()
  );
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
          return await downloadDapp(
            record.recordHash,
            record.location,
            record.edited
          );
        } catch (error) {
          console.warn(error);

          return Promise.resolve(undefined);
        }
      })
    )
  ).filter((dapp) => Boolean(dapp)) as LocalDapp[];
}

export async function getValidatedRecords(
  address: string
): Promise<Record<string, DappRecord>> {
  const records = await dappRegistry.getValidatedRecords(address);

  return records.reduce((map, dapp) => {
    map[dapp.recordHash] = dapp;

    return map;
  }, {} as Record<string, DappRecord>);
}

export default dappRegistry;

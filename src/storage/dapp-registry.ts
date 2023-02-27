import {
  DappRegistry,
  getDappRegistryEnvironmentConfig,
  Environments,
} from "@fairdatasociety/fdp-contracts/js-library";
import { Bee } from "@ethersphere/bee-js";
import { BeeSon, TypeManager } from "@fairdatasociety/beeson";
import { utils, BigNumber, Wallet } from "ethers";
import { Dapp, DappSchema } from "../model/Dapp";
import { toUtf8Bytes } from "ethers/lib/utils";

const dappRegistry = new DappRegistry(
  getDappRegistryEnvironmentConfig(
    import.meta.env.ENVIRONMENT === "GOERLI"
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

  beesonRecord.superBeeSon = true;

  const { reference } = await bee.uploadData(
    import.meta.env.VITE_BATCH_ID,
    beesonRecord.serialize(),
    { encrypt: false }
  );

  await dappRegistry.createRecord(`0x${reference}`, hashDappUrl(url));
}

export function updateDapp(url: string, record: Dapp): Promise<void> {
  throw new Error("Not implemented");
}

export async function getDapp(swarmLocation: string): Promise<Dapp> {
  const data = await bee.downloadData(swarmLocation.substring(2));

  const deserializedBeeson = (await BeeSon.deserialize(data)) as BeeSon<Dapp>;

  const dappSchema = new BeeSon({ json: DappSchema });

  dappSchema.superBeeSon = true;

  // Checks data schema
  dappSchema.json = deserializedBeeson.json;

  return deserializedBeeson.json;
}

export async function getDapps(start: number, length: number): Promise<Dapp[]> {
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
          return Promise.resolve(undefined);
        }
      })
    )
  ).filter((dapp) => Boolean(dapp)) as Dapp[];
}

export default dappRegistry;

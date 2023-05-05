// TODO should be split into two models
export interface Dapp {
  name: string;
  url: string;
  ens: string;
  authorName: string;
  authorAddress: string;
  category: string;
  logo: string;
  shortDescription: string;
  longDescription: string;
  github: string;
  website: string;
  telegram: string;
  reddit: string;
  twitter: string;
  discord: string;
}

export interface LocalDapp extends Dapp {
  hash: string;
  location: string;
  validated: boolean;
  edited: boolean;
  averageRating?: number;
  numberOfRatings?: number;
}

export const DappSchema: Dapp = {
  name: "",
  url: "",
  ens: "",
  authorName: "",
  authorAddress: "",
  category: "",
  logo: "",
  shortDescription: "",
  longDescription: "",
  github: "",
  website: "",
  telegram: "",
  reddit: "",
  twitter: "",
  discord: "",
};

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
};

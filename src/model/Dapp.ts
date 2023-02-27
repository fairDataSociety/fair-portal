export interface Dapp {
  name: string;
  url: string;
  authorName: string;
  authorAddress: string;
  category: string;
  subcategories: string[];
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
  authorName: "",
  authorAddress: "",
  category: "",
  subcategories: [],
  logo: "",
  shortDescription: "",
  longDescription: "",
  github: "",
  website: "",
  telegram: "",
  reddit: "",
  twitter: "",
};

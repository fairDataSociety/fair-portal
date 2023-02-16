export interface Dapp {
  name: string;
  authorName: string;
  authorAddress: string;
  categories: string[];
}

export const DappSchema: Dapp = {
  name: "",
  authorName: "",
  authorAddress: "",
  categories: [],
};

const baseURI = import.meta.env.VITE_BASE_URI || "";

const RouteCodes = {
  home: `${baseURI}/`,
  registerDapp: `${baseURI}/register-dapp`,
  editDapp: `${baseURI}/edit-dapp/:hash`,
  dapp: `${baseURI}/dapp/:hash`,
};

export default RouteCodes;

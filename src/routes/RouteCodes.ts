const baseURI = import.meta.env.VITE_BASE_URI || "";

const RouteCodes = {
  home: `${baseURI}/`,
  registerDapp: `${baseURI}/register-dapp`,
  editDapp: `${baseURI}/edit-dapp/:hash`,
  editExpiredDapp: `${baseURI}/edit-expired-dapp/:hash`,
  dapp: `${baseURI}/dapp/:hash`,
  expiredDapps: `${baseURI}/expired-dapps`,
};

export default RouteCodes;

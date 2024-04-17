import { providers, Signer } from "ethers";
import React, { useState } from "react";
import { createContext, useContext } from "react";
import dappRegistry from "../storage/dapp-registry";

export interface WalletContext {
  connected: boolean;
  address: string | null;
  loading: boolean;
  isValidator: boolean;
  isAdmin: boolean;
  setWallet: (
    signerOrProvider: string | providers.Provider | Signer,
    address: string
  ) => void;
  removeWallet: () => void;
}

const WalletContext = createContext<WalletContext>({
  connected: false,
  address: "",
  loading: false,
  isValidator: false,
  isAdmin: false,
  setWallet: () => {},
  removeWallet: () => {},
});

export const useWalletContext = () => useContext(WalletContext);

export interface WalletContextProviderProps {
  children: React.ReactNode;
}

export const WalletContextProvider = ({
  children,
}: WalletContextProviderProps) => {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [roles, setRoles] = useState<{
    isAdmin: boolean;
    isValidator: boolean;
  }>({ isAdmin: false, isValidator: false });

  const setWallet = async (
    signerOrProvider: string | providers.Provider | Signer,
    address: string
  ) => {
    const provider = dappRegistry.provider;

    try {
      setLoading(true);
      dappRegistry.connect(signerOrProvider);
      setAddress(address);

      const isAdmin = await dappRegistry.isAdmin(address);

      setRoles({
        isValidator: address === import.meta.env.VITE_FDP_ADDRESS,
        isAdmin,
      });
    } catch (error) {
      removeWallet();
      dappRegistry.connect(provider);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeWallet = () => {
    dappRegistry.connect("");
    setAddress(null);
  };

  return (
    <WalletContext.Provider
      value={{
        connected: Boolean(address),
        address,
        isValidator: roles.isValidator,
        isAdmin: roles.isAdmin,
        loading,
        setWallet,
        removeWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

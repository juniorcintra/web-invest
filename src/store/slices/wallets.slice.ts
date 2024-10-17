import { Wallet } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type WalletsState = {
  wallets: Wallet[];
  wallet?: Wallet;
  setWallets: (wallets: Wallet[]) => void;
  setWalletselected: (wallet: Wallet | undefined) => void;
};

export const useWalletsStore = create<WalletsState>()(
  persist(
    (set) => ({
      wallets: [],
      wallet: undefined,
      setWallets: (wallets) => set({ wallets: wallets }),
      setWalletselected: (wallet) => set({ wallet: wallet }),
    }),
    {
      name: "wallets",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useWalletsStore;

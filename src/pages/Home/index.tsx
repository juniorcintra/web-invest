/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import Header from "@/components/Header";
import CreateEditContact from "@/components/CreateEditContact";
import { Wallet } from "@/types";
import api from "@/services/api";
import { useUserStore, useWalletsStore } from "@/store/slices";
import CardWallet from "@/components/CardWallet";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const { setWallets, wallets, wallet, setWalletselected } = useWalletsStore();
  const { user } = useUserStore();

  const [newWalletsList, setNewWalletsList] = useState<Wallet[]>([]);
  const [orderedList, setOrderedList] = useState("asc");

  const [showModalFormContact, setShowModalFormContact] = useState(false);

  useEffect(() => {
    if (searchTerm !== "") {
      if (
        wallets.some((wallet) =>
          wallet.nome?.toUpperCase().includes(searchTerm.toUpperCase()),
        )
      ) {
        setNewWalletsList(
          wallets.filter((wallet) =>
            wallet.nome?.toUpperCase().includes(searchTerm.toUpperCase()),
          ),
        );
        return;
      } else {
        setNewWalletsList([]);
      }
    } else {
      setNewWalletsList(wallets);
    }
  }, [searchTerm, wallets]);

  const handleDeleteWallet = async (id: number) => {
    try {
      await api.delete(`/wallets/${id}`);

      const response = await api.get(`/wallets?userId=${user?.id}`);

      setWallets(response.data);
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  };

  const handleEdit = (wallet: Wallet) => {
    setShowModalFormContact(!showModalFormContact);
    setWalletselected(wallet);
  };

  const handleGetWallets = async () => {
    try {
      const response = await api.get(`/wallets?userId=${user?.id}`);

      setWallets(response.data);
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  };

  useEffect(() => {
    if (!showModalFormContact) {
      handleGetWallets();
    }
  }, [showModalFormContact]);

  return (
    <main className="flex h-screen w-full flex-col">
      <Header />
      <div className="flex h-full w-full flex-row">
        <div className="relative flex h-full w-full flex-row flex-wrap items-start space-y-4 border p-2">
          <div className="flex w-full flex-row items-center justify-between gap-6">
            <div className="flex flex-row items-center gap-2">
              <Input
                className="flex-1"
                placeholder="Digite o nome da carteira"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              <Button onClick={() => setShowModalFormContact(true)}>
                Nova carteira +
              </Button>
            </div>
            <div className="flex flex-row items-center gap-2">
              Ordenar:
              <Button onClick={() => setOrderedList("asc")}>
                <ArrowDownAZ />
              </Button>
              <Button onClick={() => setOrderedList("desc")}>
                <ArrowUpAZ />
              </Button>
            </div>
          </div>
          <div className="flex h-full w-full flex-row gap-6">
            {newWalletsList.length > 0 ? (
              newWalletsList
                ?.slice()
                .sort((a, b) => {
                  const nameA = a.nome || "";
                  const nameB = b.nome || "";

                  return orderedList === "asc"
                    ? nameA.localeCompare(nameB)
                    : nameB.localeCompare(nameA);
                })
                .map((wallet, index) => (
                  <CardWallet
                    key={index}
                    wallet={wallet}
                    handleEdit={handleEdit}
                    handleDeleteWallet={handleDeleteWallet}
                  />
                ))
            ) : (
              <span>Nenhuma carteira encontrada...</span>
            )}
          </div>
        </div>
      </div>
      <CreateEditContact
        showModalFormContact={showModalFormContact}
        setShowModalFormContact={setShowModalFormContact}
        data={wallet}
      />
    </main>
  );
}

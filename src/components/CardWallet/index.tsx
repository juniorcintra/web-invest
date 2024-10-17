import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Wallet } from "@/types";

interface CardWalletProps {
  wallet: Wallet;
  handleEdit: (wallet: Wallet) => void;
  handleDeleteWallet: (id: number) => void;
}

export default function CardWallet({
  wallet,
  handleEdit,
  handleDeleteWallet,
}: CardWalletProps) {
  return (
    <Card className="flex h-48 max-w-96 flex-col justify-between space-y-2 p-2">
      <CardContent className="flex flex-col space-y-2 p-0">
        <p className="capitalize">
          <strong className="mr-1">Nome:</strong>
          {wallet.nome}{" "}
        </p>
        <p>
          <strong className="mr-1">Criada em:</strong>
          {wallet.createdAt}{" "}
        </p>
        <p>
          <strong className="mr-1">Ativos:</strong>
          {wallet.ativos.length}
        </p>
      </CardContent>
      <CardFooter className="justify-between p-0">
        <Button
          className="bg-blue-400 text-black hover:bg-blue-500"
          onClick={() => {
            handleEdit(wallet);
          }}
        >
          Editar
        </Button>
        <Button
          className="bg-red-400 text-black hover:bg-red-500"
          onClick={() => handleDeleteWallet(wallet?.id)}
        >
          Excluir
        </Button>
      </CardFooter>
    </Card>
  );
}

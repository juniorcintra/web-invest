import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Acao, BodyActions, Wallet } from "@/types";
import api from "@/services/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useUserStore } from "@/store/slices";

interface CreateEditContactProps {
  showModalFormContact: boolean;
  setShowModalFormContact: (value: boolean) => void;
  data?: Wallet;
}

export default function CreateEditContact({
  showModalFormContact,
  setShowModalFormContact,
  data,
}: CreateEditContactProps) {
  const [nameWallet, setNameWallet] = useState("");
  const [qtdActions, setQtdActions] = useState(0);
  const [actionSelected, setActionSelected] = useState<Acao | undefined>();
  const [actionsBody, setActionsBody] = useState<BodyActions[]>([]);

  const [actions, setActions] = useState<Acao[]>();

  const { user } = useUserStore();

  useEffect(() => {
    setNameWallet(data?.nome ?? "");

    setActionsBody(
      data?.ativos?.map((ativo) => {
        return {
          ticker: ativo.acao.ticker || "",
          quantidade: ativo.quantidade,
          valorMedio: ativo.valorMedio,
        };
      }) || [],
    );
  }, [data, data?.ativos]);

  const handleCleanStateModal = () => {
    setShowModalFormContact(!showModalFormContact);
    setNameWallet("");
    setActionsBody([]);
  };

  const actionsOptions =
    actions?.map((action) => ({
      value: action,
      label: action.ticker || "",
    })) || [];

  const handleSubmit = async () => {
    try {
      const body = {
        nome: nameWallet,
        userId: user?.id,
        ativos: actionsBody,
      };

      await api.post("/wallets", body);

      handleCleanStateModal();
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  };

  const handleAddAction = () => {
    const value = actionSelected?.valorAtual as number;

    setActionsBody([
      ...actionsBody,
      {
        ticker: actionSelected?.ticker || "",
        quantidade: qtdActions,
        valorMedio: value * qtdActions,
      },
    ]);

    setActionSelected(undefined);
    setQtdActions(0);
  };

  const handleDeleteAction = (action: BodyActions) => {
    setActionsBody(actionsBody.filter((ac) => ac.ticker !== action.ticker));
  };

  const handleGetActions = async () => {
    try {
      const response = await api.get(`/wallets/getActions`);

      setActions(response.data);
    } catch (error) {
      console.log("🚀 ~ error:", error);
    }
  };

  useEffect(() => {
    handleGetActions();
  }, []);

  return (
    <Dialog open={showModalFormContact} onOpenChange={handleCleanStateModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {data ? "Editar Carteira" : "Criar Carteira"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex max-h-96 flex-col gap-4 overflow-y-auto py-4">
          <div className="flex w-full items-center justify-end gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              className="w-3/4"
              value={nameWallet}
              onChange={(e) => setNameWallet(e.target.value)}
            />
          </div>
          <div className="flex w-full items-center justify-end gap-4">
            <Label htmlFor="name" className="text-right">
              Ação x Quantidade
            </Label>
            <Select
              value={
                actionSelected ? JSON.stringify(actionSelected) : undefined
              }
              onValueChange={(e) => setActionSelected(JSON.parse(e))}
            >
              <SelectTrigger className="w-2/4">
                <SelectValue placeholder={"Selecione a ação"} />
              </SelectTrigger>
              <SelectContent>
                {actionsOptions.map((option) => (
                  <SelectItem value={JSON.stringify(option.value)}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="quantidade"
              placeholder="Quantidade"
              className="w-1/4"
              type="number"
              value={qtdActions}
              onChange={(e) => setQtdActions(Number(e.target.value))}
            />
          </div>
          <Button
            onClick={handleAddAction}
            disabled={!actionSelected || qtdActions === 0}
          >
            Adicionar Ação
          </Button>
          <Table>
            {actionsBody.length === 0 ? (
              <TableCaption>Nenhuma ação selecionada</TableCaption>
            ) : (
              <>
                {" "}
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Ticker</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Valor Medio</TableHead>
                    <TableHead className="text-right">Remover</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {actionsBody.map((action) => (
                    <TableRow>
                      <TableCell className="font-medium">
                        {action.ticker}
                      </TableCell>
                      <TableCell>{action.quantidade}</TableCell>
                      <TableCell>{action.valorMedio}</TableCell>
                      <TableCell className="flex flex-row justify-end">
                        <Trash2
                          className="size-4 cursor-pointer"
                          onClick={() => handleDeleteAction(action)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </>
            )}
          </Table>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Salvar carteira</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

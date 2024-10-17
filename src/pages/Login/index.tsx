import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { useGlobalStoreContext } from "@/store";
import { useUserStore } from "@/store/slices";
import { validateCpf } from "@/utils/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userDocument, setUserDocument] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const navigate = useNavigate();

  const { setUserSelected } = useUserStore();
  const { authenticateUser } = useGlobalStoreContext();

  const handleSubmit = async () => {
    if (showRegister) {
      if (!validateCpf(userDocument)) {
        toast.error("CPF Inválido!");
        return;
      }

      const userData = {
        nome: userName,
        cpf: userDocument,
        login: userLogin,
        email: userEmail,
        senha: userPassword,
      };

      await api.post("users", userData);

      setShowRegister(false);
      setUserName("");
      setUserEmail("");
      setUserPassword("");
      setUserDocument("");
      setUserLogin("");
    } else {
      try {
        const userData = {
          login: userEmail,
          senha: userPassword,
        };

        await api.post("auth/login", userData).then((res) => {
          localStorage.setItem(
            "@token",
            JSON.stringify({
              access_token: res.data.access_token,
              refresh_token: res.data.refresh_token,
            }),
          );

          setUserSelected(res.data);
          authenticateUser();
          toast.success(`Bem vindo(a) ${res.data.nome}`);
          navigate("/home");
        });
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="flex h-auto w-80 flex-col justify-between">
        <CardHeader>
          <CardTitle>{showRegister ? "Cadastro" : "Login"}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {showRegister && (
            <>
              <Input
                placeholder="Nome Completo"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Input
                placeholder="CPF"
                value={userDocument}
                onChange={(e) => setUserDocument(e.target.value)}
              />
              <Input
                placeholder="Login"
                value={userLogin}
                onChange={(e) => setUserLogin(e.target.value)}
              />
            </>
          )}
          <Input
            placeholder={showRegister ? "E-mail" : "Login ou E-mail"}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <Input
            placeholder="Senha"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            type="password"
          />
        </CardContent>
        <CardFooter className="flex flex-row items-center justify-between gap-2">
          {!showRegister && (
            <p className="cursor-pointer" onClick={() => setShowRegister(true)}>
              Criar Conta
            </p>
          )}
          {showRegister && (
            <Button className="flex-1" onClick={() => setShowRegister(false)}>
              Voltar
            </Button>
          )}
          <Button className="flex-1" onClick={handleSubmit}>
            {showRegister ? "Cadastrar" : "Entrar"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

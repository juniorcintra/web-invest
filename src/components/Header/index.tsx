import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/slices";

import AvatarIMG from "@/assets/user.png";
import { useGlobalStoreContext } from "@/store";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, setUserSelected } = useUserStore();
  const navigate = useNavigate();
  const { logoutUser } = useGlobalStoreContext();

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("@token");
    logoutUser();
    setUserSelected(undefined);
  };

  return (
    <div className="flex w-full flex-row items-center justify-between px-4 py-2">
      <h3>Carteiras de investimentos</h3>
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex cursor-pointer flex-row items-center gap-2 rounded-2xl border border-zinc-600 p-1">
            <Avatar>
              <AvatarImage src={AvatarIMG} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="capitalize">{user?.nome} </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex w-40 flex-col space-y-4">
          <Button className="bg-black text-white" onClick={handleLogout}>
            Deslogar
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}

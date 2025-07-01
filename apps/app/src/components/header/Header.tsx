import { useAccount, useDisconnect } from '@fuels/react';
import { Copy, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function Header() {
  const { account, isLoading } = useAccount();
  const { disconnect } = useDisconnect();

  const handleCopyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      toast('Endereço copiado para a área de transferência!');
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast('Desconectado com sucesso!');
  };

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center bg-primary-foreground rounded-md">
            <img
              src="./logo-icon.png"
              alt="AgroShield Logo"
              className="h-16 w-16"
            />
          </div>
          <h1 className="text-2xl font-bold">AgroShield</h1>
        </div>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
              >
                {isLoading
                  ? 'Carregando...'
                  : `${account?.slice(0, 6)}...${account?.slice(-4)}`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={handleCopyAddress}
                >
                  <Copy className="h-4 w-4" />
                  <span>Copiar endereço</span>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={handleDisconnect}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Desconectar</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

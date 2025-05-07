import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useConnectUI, useIsConnected } from '@fuels/react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Login() {
  const { connect, isConnecting } = useConnectUI();
  const { isConnected } = useIsConnected();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleConnect = async () => {
    try {
      connect();
      toast('Seja bem-vindo! Carteira conectada com sucesso.');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      navigate(from, { replace: true });
    }
  }, [isConnected, navigate, from]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">AgroShield</CardTitle>
          <CardDescription>Conecte sua carteira para continuar</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button size="lg" onClick={handleConnect} disabled={isConnecting}>
            Conectar Carteira
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

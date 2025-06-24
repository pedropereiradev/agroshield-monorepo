import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useConnectUI, useIsConnected } from '@fuels/react';
import { Shield, Wallet } from 'lucide-react';
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
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Erro ao conectar carteira', {
        description:
          'Tente novamente ou verifique se sua carteira está instalada.',
      });
    }
  };

  useEffect(() => {
    if (isConnected) {
      navigate(from, { replace: true });
    }
  }, [isConnected, navigate, from]);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-green-800 h-2" />

      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-700 rounded-sm mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              AgroShield
            </h1>
            <p className="text-stone-700 text-base">Seguro Rural Digital</p>
          </div>

          <Card className="bg-white border-2 border-green-200 shadow-lg">
            <CardHeader className="text-center border-b border-green-100 pb-6">
              <CardTitle className="text-xl text-stone-800 font-semibold">
                Acesse sua conta
              </CardTitle>
              <CardDescription className="text-stone-600 text-base mt-2">
                Use sua carteira digital para entrar no sistema
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8">
              <Button
                size="lg"
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full h-14 bg-green-700 hover:bg-green-800 text-white text-lg font-medium rounded-sm shadow-md transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isConnecting ? (
                  <span className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                    Conectando...
                  </span>
                ) : (
                  <>
                    <Wallet className="w-5 h-5 mr-3" />
                    Conectar Carteira
                  </>
                )}
              </Button>

              <div className="mt-8 pt-6 border-t border-stone-200">
                <h3 className="text-stone-800 font-medium mb-4 text-center">
                  O que você pode fazer:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start text-stone-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-sm">
                      Fazer seguro para suas plantações
                    </span>
                  </div>
                  <div className="flex items-start text-stone-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-sm">
                      Receber indenização automática por perdas climáticas
                    </span>
                  </div>
                  <div className="flex items-start text-stone-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-sm">
                      Acompanhar o status dos seus seguros
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <p className="text-sm text-stone-600">
              Primeira vez aqui?{' '}
              <a
                className="text-green-700 hover:text-green-800 font-medium underline"
                href="https://agroshield.co"
                target="_blank"
                rel="noopener noreferrer"
              >
                Aprenda como usar
              </a>
            </p>
          </div>

          <div className="text-center mt-4">
            <div className="inline-flex items-center px-4 py-2 bg-white border border-green-200 rounded-sm text-sm text-stone-600">
              <Shield className="w-4 h-4 text-green-600 mr-2" />
              Tecnologia segura e confiável
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

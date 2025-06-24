import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Construction, Shield, TrendingUp } from 'lucide-react';

export function Overview() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Visão Geral
        </CardTitle>
        <CardDescription>
          Dashboard com resumo das suas apólices e atividade recente
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="flex justify-center">
            <div className="p-4 bg-orange-100 rounded-full">
              <Construction className="h-12 w-12 text-orange-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-muted-foreground">
              Em Construção
            </h3>
            <p className="text-sm text-muted-foreground">
              Estamos trabalhando em um dashboard completo com estatísticas das suas apólices, 
              resumo de coberturas e atividade recente.
            </p>
          </div>
          <div className="flex justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              Estatísticas
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              Resumo de Coberturas
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

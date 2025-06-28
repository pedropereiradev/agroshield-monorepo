import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { usePolicies } from '@/hooks/usePolicies';
import { useRequestClaim } from '@/hooks/useRequestClaim';
import { cn } from '@/lib/utils';
import { formatMicroUnits } from '@/utils/currency';
import {
  getPolicyLabel,
  getStatusColor,
  getStatusLabel,
} from '@/utils/mapping';
import { CloudRain, Leaf, Loader2, Thermometer } from 'lucide-react';

export function Policies() {
  const { policies, isLoading, error } = usePolicies();
  const { requestClaim, isRequesting } = useRequestClaim();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getPolicyIcon = (policyType: string) => {
    switch (policyType) {
      case 'Rainfall':
        return CloudRain;
      case 'Temperature':
        return Thermometer;
      case 'Drought':
        return Leaf;
      default:
        return Leaf;
    }
  };

  const handleClaimRequest = async (policyId: string) => {
    await requestClaim(policyId);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Minhas Apólices</CardTitle>
          <CardDescription>
            Todas as suas apólices de seguro ativas e passadas
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Carregando apólices...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Minhas Apólices</CardTitle>
          <CardDescription>
            Todas as suas apólices de seguro ativas e passadas
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8 text-red-600">
          <p>Erro ao carregar apólices: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Minhas Apólices</CardTitle>
        <CardDescription>
          Todas as suas apólices de seguro ativas e passadas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {policies.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Você ainda não possui apólices.</p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {policies.map((policy) => {
              const IconComponent = getPolicyIcon(policy.policyType);
              return (
                <AccordionItem
                  key={policy.id}
                  value={policy.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <AccordionTrigger className="p-4 hover:no-underline">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            policy.status === 'Active'
                              ? 'bg-green-100'
                              : 'bg-gray-100'
                          }`}
                        >
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium">
                            {policy.cropType} -{' '}
                            {getPolicyLabel(policy.policyType)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Apólice #{policy.id.slice(0, 8)}...
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={cn(
                          getStatusColor(policy.status).background,
                          getStatusColor(policy.status).text
                        )}
                      >
                        {getStatusLabel(policy.status)}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 pt-0 bg-accent/10">
                    <h4 className="text-sm font-medium mb-4">Detalhes</h4>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Valor da Cobertura
                        </p>
                        <p className="font-medium">
                          {formatMicroUnits(policy.coverageAmount)}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Prêmio Pago
                        </p>
                        <p className="font-medium">
                          {formatMicroUnits(policy.premiumPaid)}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Data de Início
                        </p>
                        <p className="font-medium">
                          {formatDate(policy.startDate)}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Data de Término
                        </p>
                        <p className="font-medium">
                          {formatDate(policy.endDate)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                          Progresso da Apólice
                        </p>
                        <span className="text-sm font-medium">
                          {Math.round(policy.progressPercentage)}%
                        </span>
                      </div>
                      <Progress
                        value={policy.progressPercentage}
                        className="h-2"
                      />
                      <div className="flex justify-end py-3">
                        <Button
                          onClick={() => {
                            handleClaimRequest(policy.id);
                          }}
                          disabled={isRequesting || policy.status !== 'Active'}
                        >
                          {isRequesting && <Loader2 className="animate-spin" />}
                          {isRequesting
                            ? 'Solicitando...'
                            : policy.status === 'Active'
                              ? 'Solicitar Resgate'
                              : 'Resgate Indisponível'}
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}

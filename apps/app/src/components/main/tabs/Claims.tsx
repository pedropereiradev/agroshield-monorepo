import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useClaims } from '@/hooks/useClaims';
import { ArrowRight, Clock, FileText, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statusColors = {
  Pending: { background: 'bg-yellow-100', text: 'text-yellow-800' },
  Active: { background: 'bg-green-100', text: 'text-green-800' },
  Inactive: { background: 'bg-red-100', text: 'text-red-800' },
  Approved: { background: 'bg-blue-100', text: 'text-blue-800' },
  Rejected: { background: 'bg-red-100', text: 'text-red-800' },
  Claimed: { background: 'bg-purple-100', text: 'text-purple-800' },
  Expired: { background: 'bg-gray-100', text: 'text-gray-800' },
};

export function Claims() {
  const { claims, isLoading, error } = useClaims();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Resgates</CardTitle>
          <CardDescription>
            Histórico de todas as mudanças de status das suas apólices
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Carregando resgates...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Resgates</CardTitle>
          <CardDescription>
            Histórico de todas as mudanças de status das suas apólices
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8 text-red-600">
          <p>Erro ao carregar resgates: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resgates</CardTitle>
        <CardDescription>
          Histórico de todas as mudanças de status das suas apólices
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {claims.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhum resgate encontrado.</p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {claims.map((claim) => (
              <AccordionItem
                key={claim.id}
                value={claim.id}
                className="border rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="p-4 hover:no-underline">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-blue-100">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium">
                          Apólice #{claim.policyId.slice(0, 8)}...
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {claim.timeAgo}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${
                          statusColors[
                            claim.oldStatus as keyof typeof statusColors
                          ]?.background || 'bg-gray-100'
                        } ${
                          statusColors[
                            claim.oldStatus as keyof typeof statusColors
                          ]?.text || 'text-gray-800'
                        }`}
                      >
                        {claim.oldStatus}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <Badge
                        className={`${
                          statusColors[
                            claim.newStatus as keyof typeof statusColors
                          ]?.background || 'bg-gray-100'
                        } ${
                          statusColors[
                            claim.newStatus as keyof typeof statusColors
                          ]?.text || 'text-gray-800'
                        }`}
                      >
                        {claim.newStatus}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0 bg-accent/10">
                  <h4 className="text-sm font-medium mb-4">
                    Detalhes do Resgate
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        ID da Apólice
                      </p>
                      <p className="font-medium font-mono text-sm">
                        {claim.policyId}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Data e Hora
                      </p>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{claim.formattedDate}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Status Anterior
                      </p>
                      <Badge
                        className={`${
                          statusColors[
                            claim.oldStatus as keyof typeof statusColors
                          ]?.background || 'bg-gray-100'
                        } ${
                          statusColors[
                            claim.oldStatus as keyof typeof statusColors
                          ]?.text || 'text-gray-800'
                        }`}
                      >
                        {claim.oldStatus}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">
                        Novo Status
                      </p>
                      <Badge
                        className={`${
                          statusColors[
                            claim.newStatus as keyof typeof statusColors
                          ]?.background || 'bg-gray-100'
                        } ${
                          statusColors[
                            claim.newStatus as keyof typeof statusColors
                          ]?.text || 'text-gray-800'
                        }`}
                      >
                        {claim.newStatus}
                      </Badge>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
      {/* <CardFooter className="flex justify-end">
        <Button
          size="lg"
          onClick={() => {
            navigate('/new-claim');
          }}
        >
          Solicitar resgate
        </Button>
      </CardFooter> */}
    </Card>
  );
}

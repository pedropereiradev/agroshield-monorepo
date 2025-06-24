import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  type Crop,
  type EventId,
  eventOptions,
  months,
} from '@/constants/policy';
import type { QuoteResponse } from '@/services/quote';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

interface PolicySummaryProps {
  crop: Crop;
  triggerEvent: EventId;
  areaHa: number;
  coveragePct: number;
  plantingMonth: number;
  harvestMonth: number;
  latitude: number | undefined;
  longitude: number | undefined;
  quote: QuoteResponse | null;
  isLoadingQuote: boolean;
  quoteError: Error | null;
  policyError: string | null;
  onGetQuote: () => void;
  onPurchasePolicy: () => void;
  isFormValid: boolean;
  isProcessing: boolean;
}

export function PolicySummary({
  crop,
  triggerEvent,
  areaHa,
  coveragePct,
  plantingMonth,
  harvestMonth,
  latitude,
  longitude,
  quote,
  isLoadingQuote,
  quoteError,
  policyError,
  onGetQuote,
  onPurchasePolicy,
  isFormValid,
  isProcessing,
}: PolicySummaryProps) {
  const selectedEvent = eventOptions[crop].find(
    (event) => event.id === triggerEvent
  );

  const coveragePctUI = Math.round(coveragePct * 100);

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Resumo da Apólice</CardTitle>
        <CardDescription>
          Reveja os detalhes da sua apólice de seguro
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Cobertura desejada</h3>
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            {selectedEvent && (
              <selectedEvent.icon
                className={clsx('h-5 w-5', selectedEvent.iconColor)}
              />
            )}
            <div>
              <span className="font-medium capitalize">{crop}</span>
              <span className="text-gray-500"> - {selectedEvent?.label}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium">Detalhes da Propriedade</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-500">Area:</div>
            <div className="font-medium text-right">{areaHa} ha</div>
            <div className="text-gray-500">Cobertura:</div>
            <div className="font-medium text-right">{coveragePctUI}%</div>
            <div className="text-gray-500">Plantio:</div>
            <div className="font-medium text-right">
              {months.find((m) => m.value === plantingMonth)?.label}
            </div>
            <div className="text-gray-500">Colheita:</div>
            <div className="font-medium text-right">
              {months.find((m) => m.value === harvestMonth)?.label}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium">Localização</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-500">Latitude:</div>
            <div className="font-medium text-right">
              {latitude?.toFixed(6) || 'Not set'}
            </div>
            <div className="text-gray-500">Longitude:</div>
            <div className="font-medium text-right">
              {longitude?.toFixed(6) || 'Not set'}
            </div>
          </div>
        </div>

        {quote && (
          <div className="border-t pt-4">
            <div className="space-y-3">
              <h3 className="font-medium">Detalhes da Cotação</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {/* <div className="text-gray-500">Probability:</div>
                <div className="font-medium text-right">
                  {(quote.probability * 100).toFixed(2)}%
                </div> */}
                <div className="text-gray-500">LMI:</div>
                <div className="font-medium text-right">
                  {quote.LMI.toFixed(4)} USDC
                </div>
                <div className="text-gray-500">Premium:</div>
                <div className="font-medium text-right">
                  {quote.premium.toFixed(4)} USDC
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <span className="font-medium">Total:</span>
              <span className="text-xl font-bold">
                {quote.premium.toFixed(4)} USDC
              </span>
            </div>
          </div>
        )}

        {quoteError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{quoteError.message}</p>
          </div>
        )}

        {policyError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{policyError}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {!quote ? (
          <Button
            className="w-full"
            onClick={onGetQuote}
            disabled={!isFormValid || isLoadingQuote}
          >
            {isLoadingQuote ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Realizando Cotação...
              </>
            ) : (
              'Get Quote'
            )}
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={onPurchasePolicy}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              'Purchase Policy'
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

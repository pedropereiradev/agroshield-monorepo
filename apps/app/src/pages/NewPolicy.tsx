import { CropSelection } from '@/components/policy/CropSelection';
import { FarmDetailsForm } from '@/components/policy/FarmDetailsForm';
import { FarmLocationMap } from '@/components/policy/FarmLocationMap';
import { PolicySummary } from '@/components/policy/PolicySummary';
import { RiskEventSelection } from '@/components/policy/RiskEventSelection';
import { Button } from '@/components/ui/button';
import type { Crop, EventId } from '@/constants/policy';
import { usePolicyCreation } from '@/hooks/usePolicyCreation';
import type { PolicyDetails } from '@/hooks/usePolicyCreation';
import { useQuote, validateQuoteRequest } from '@/hooks/useQuote';
import type { QuoteRequest } from '@/services/quote';
import { PolicyTypeInput } from '@/sway-contracts-api/contracts/InsuranceContract';
import { toMicroUnits } from '@/utils/currency';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function NewPolicy() {
  const navigate = useNavigate();
  const {
    createPolicy,
    isCreating,
    error: policyError,
    isReady,
  } = usePolicyCreation();

  const [policyData, setPolicyData] = useState<QuoteRequest>({
    crop: 'soy',
    triggerEvent: 'soy_drought',
    areaHa: 10,
    coveragePct: 0.8,
    plantingMonth: 4,
    harvestMonth: 9,
    latitude: -31.76997,
    longitude: -52.34101,
  });

  const [isFormValid, setIsFormValid] = useState(true);

  const {
    getQuote,
    quote,
    isLoading: isLoadingQuote,
    error: quoteError,
    reset: resetQuote,
  } = useQuote({
    onSuccess: () => {
      toast.success('Cotação obtida com sucesso!');
    },
    onError: (error) => {
      toast.error(`Falha ao obter cotação: ${error.message}`);
    },
  });

  const handleCropChange = (crop: Crop) => {
    const newTriggerEvent = crop === 'soy' ? 'soy_drought' : 'rice_drought';
    const newData = {
      ...policyData,
      crop,
      triggerEvent: newTriggerEvent as EventId,
    };

    setPolicyData(newData);
    resetQuote();
    validateForm(newData);
  };

  const handleFieldChange = (field: keyof QuoteRequest, value: any) => {
    const newData = { ...policyData, [field]: value };
    setPolicyData(newData);
    resetQuote();
    validateForm(newData);
  };

  const validateForm = (data: Partial<QuoteRequest>) => {
    setIsFormValid(validateQuoteRequest(data));
  };

  const handleGetQuote = async () => {
    if (!isFormValid) return;

    try {
      await getQuote(policyData);
    } catch (e) {
      console.error('Error getting quote:', e);
    }
  };

  const handlePurchasePolicy = async () => {
    if (!isReady || !quote) {
      toast.error('Não foi possível comprar a apólice', {
        description: !isReady
          ? 'Por favor, conecte sua carteira primeiro.'
          : 'Por favor, obtenha uma cotação primeiro.',
      });
      return;
    }

    try {
      const policyDetails: PolicyDetails = {
        crop: policyData.crop,
        regionX: policyData.longitude,
        regionY: policyData.latitude,
        insuredValue: toMicroUnits(quote.LMI),
        premium: toMicroUnits(quote.premium),
        policyType: policyData.triggerEvent.includes('drought')
          ? PolicyTypeInput.Drought
          : policyData.triggerEvent.includes('heat') ||
              policyData.triggerEvent.includes('cold')
            ? PolicyTypeInput.Temperature
            : PolicyTypeInput.Rainfall,
        insuredArea: policyData.areaHa,
        insuredAreaUnit: 'Ha',
        plantingMonth: policyData.plantingMonth,
        harvestMonth: policyData.harvestMonth,
      };

      const result = await createPolicy(policyDetails);

      if (result) {
        toast.success('Apólice criada com sucesso!', {
          description: 'Sua apólice de seguro foi criada e está disponível.',
        });
        navigate('/dashboard');
      }
    } catch (e) {
      console.error('Error creating policy:', e);
      toast.error('Erro ao criar apólice', {
        description:
          'Houve um erro ao criar sua apólice. Por favor, tente novamente.',
      });
    }
  };

  const coveragePctUI = Math.round(policyData.coveragePct * 100);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Nova Apólice de Seguro</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <CropSelection
            selectedCrop={policyData.crop}
            onCropChange={handleCropChange}
          />

          <RiskEventSelection
            crop={policyData.crop}
            selectedEvent={policyData.triggerEvent}
            onEventChange={(value) => handleFieldChange('triggerEvent', value)}
          />

          <FarmDetailsForm
            areaHa={policyData.areaHa}
            onAreaChange={(value) => handleFieldChange('areaHa', value)}
            coveragePct={coveragePctUI}
            onCoverageChange={(value) =>
              handleFieldChange('coveragePct', value / 100)
            }
            plantingMonth={policyData.plantingMonth}
            onPlantingMonthChange={(value) =>
              handleFieldChange('plantingMonth', value)
            }
            harvestMonth={policyData.harvestMonth}
            onHarvestMonthChange={(value) =>
              handleFieldChange('harvestMonth', value)
            }
          />

          <FarmLocationMap
            latitude={policyData.latitude}
            longitude={policyData.longitude}
            onLatitudeChange={(value) => handleFieldChange('latitude', value)}
            onLongitudeChange={(value) => handleFieldChange('longitude', value)}
          />
        </div>

        <div className="space-y-6">
          <PolicySummary
            crop={policyData.crop}
            triggerEvent={policyData.triggerEvent}
            areaHa={policyData.areaHa}
            coveragePct={policyData.coveragePct}
            plantingMonth={policyData.plantingMonth}
            harvestMonth={policyData.harvestMonth}
            latitude={policyData.latitude}
            longitude={policyData.longitude}
            quote={quote}
            isLoadingQuote={isLoadingQuote}
            quoteError={quoteError}
            policyError={policyError}
            onGetQuote={handleGetQuote}
            onPurchasePolicy={handlePurchasePolicy}
            isFormValid={isFormValid}
            isProcessing={isCreating}
          />
        </div>
      </div>
    </div>
  );
}

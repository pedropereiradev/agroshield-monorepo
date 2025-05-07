import { CoverageDetails } from '@/components/policy/CoverageDetails';
import { FarmDetailsForm } from '@/components/policy/FarmDetailsForm';
import { PolicyTypeSelector } from '@/components/policy/PolicyTypeSelector';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
  type PolicyDetails,
  usePolicyCreation,
} from '@/hooks/usePolicyCreation';
import { type PolicyType, cropTypes } from '@/utils/mocks';
import { AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function NewPolicy() {
  const navigate = useNavigate();
  const { createPolicy, isCreating, error, isReady } = usePolicyCreation();

  // Policy type selection
  const [policyType, setPolicyType] = useState<PolicyType>('rainfall');

  // Coverage details
  const [coverageAmount, setCoverageAmount] = useState(3);
  const [premiumAmount, setPremiumAmount] = useState(0.15);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Farm details
  const [cropType, setCropType] = useState('rice');
  const [farmArea, setFarmArea] = useState('10');
  const [location, setLocation] = useState('Dom Pedrito');
  const [season, setSeason] = useState('spring');

  // Update premium when coverage changes
  const handleCoverageChange = (value: number[]) => {
    const coverage = value[0];
    setCoverageAmount(coverage);
    setPremiumAmount(coverage * 0.05);
  };

  const handleCreatePolicy = async () => {
    if (!isReady) {
      toast('Não foi possível criar a apólice', {
        description: 'Verifique se sua carteira está conectada.',
      });
      return;
    }

    if (!startDate || !endDate) {
      toast('Datas não informadas', {
        description:
          'Por favor, informe as datas de início e término da apólice.',
      });
      return;
    }

    // Calculate duration days based on start and end date
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationDays = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 3600 * 24)
    );

    if (durationDays <= 0) {
      toast('Datas inválidas', {
        description: 'A data de término deve ser posterior à data de início.',
      });
      return;
    }

    // Parse location to get coordinates (mock implementation)
    const [regionX, regionY] = [123, 456]; // In a real app, you would get these from a map API

    const policyDetails: PolicyDetails = {
      crop: cropType,
      season,
      startDate,
      durationDays,
      regionX,
      regionY,
      insuredValue: Math.floor(coverageAmount * 1000), // Convert to contract units
      premium: Math.floor(premiumAmount * 1000), // Convert to contract units
      policyType,
      expirationDate: endDate,
      insuredArea: Number.parseInt(farmArea, 10),
      insuredAreaUnit: 'Ha',
    };

    try {
      const result = await createPolicy(policyDetails);

      if (result) {
        toast('Apólice criada com sucesso!', {
          description: 'Sua apólice de seguro foi criada e está disponível.',
        });
        navigate('/dashboard');
      }
    } catch (e) {
      console.error('Error creating policy:', e);
      toast('Erro ao criar apólice', {
        description:
          'Houve um erro ao criar sua apólice. Por favor, tente novamente.',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Nova Apólice</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Selecionar Tipo de Seguro</CardTitle>
              <CardDescription>
                Escolha o tipo de seguro agrícola que você precisa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PolicyTypeSelector value={policyType} onChange={setPolicyType} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Fazenda</CardTitle>
              <CardDescription>
                Informações sobre sua fazenda e culturas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FarmDetailsForm
                cropType={cropType}
                setCropType={setCropType}
                farmArea={farmArea}
                setFarmArea={setFarmArea}
                location={location}
                setLocation={setLocation}
                season={season}
                setSeason={setSeason}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Cobertura</CardTitle>
              <CardDescription>
                Defina o valor da cobertura e o período da apólice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CoverageDetails
                coverageAmount={coverageAmount}
                onCoverageChange={handleCoverageChange}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Resumo da Apólice</CardTitle>
              <CardDescription>Revise sua apólice de seguro</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Tipo de Seguro</p>
                <p className="font-medium">
                  {policyType.charAt(0).toUpperCase() + policyType.slice(1)}{' '}
                  Seguro
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Valor da Cobertura
                </p>
                <p className="font-medium">{coverageAmount} ETH</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Prêmio</p>
                <p className="font-medium">{premiumAmount.toFixed(2)} ETH</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Tipo de Cultura</p>
                <p className="font-medium">
                  {cropTypes.find((c) => c.value === cropType)?.label ||
                    cropType}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Área da Fazenda</p>
                <p className="font-medium">{farmArea} Hectares</p>
              </div>
              <div className="border-t my-4" />
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Valor do Prêmio</p>
                <p className="text-xl font-bold">
                  {premiumAmount.toFixed(2)} ETH
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleCreatePolicy}
                disabled={isCreating || !isReady || !startDate || !endDate}
              >
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  'Comprar Apólice'
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

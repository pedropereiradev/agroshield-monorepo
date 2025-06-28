import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {} from '@/components/ui/tooltip';
import { formatCurrency } from '@/utils/currency';

interface CoverageDetailsProps {
  coverageAmount: number;
  onCoverageChange: (value: number[]) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
}

export function CoverageDetails({
  coverageAmount,
  onCoverageChange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: CoverageDetailsProps) {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-1">
        <TabsTrigger value="basic">Cobertura basica</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="space-y-6 pt-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Valor coberto (USDC)</Label>
            <span className="font-medium">{formatCurrency(coverageAmount)}</span>
          </div>
          <Slider
            defaultValue={[coverageAmount]}
            max={10}
            min={1}
            step={0.5}
            onValueChange={onCoverageChange}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>1 USDC</span>
            <span>10 USDC</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="start-date">Data de Início</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date">Data de Término</Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

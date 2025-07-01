import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { months } from '@/constants/policy';
import { Info } from 'lucide-react';

interface FarmDetailsFormProps {
  areaHa: number;
  onAreaChange: (value: number) => void;
  coveragePct: number;
  onCoverageChange: (value: number) => void;
  plantingMonth: number;
  onPlantingMonthChange: (value: number) => void;
  harvestMonth: number;
  onHarvestMonthChange: (value: number) => void;
}

export function FarmDetailsForm({
  areaHa,
  onAreaChange,
  coveragePct,
  onCoverageChange,
  plantingMonth,
  onPlantingMonthChange,
  harvestMonth,
  onHarvestMonthChange,
}: FarmDetailsFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes da safra</CardTitle>
        <CardDescription>
          Informações sobre sua propriedade e cobertura
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="area">Área plantada(Hectares)</Label>
            <Input
              id="area"
              type="number"
              min="0.1"
              step="0.1"
              value={areaHa}
              onChange={(e) =>
                onAreaChange(Number.parseFloat(e.target.value) || 0)
              }
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Porcentagem coberta</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      A porcentagem coberta é a porcentagem do valor do seu
                      cultivo que será coberta pela política de seguro.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="space-y-4">
              <Slider
                value={[coveragePct]}
                onValueChange={(value) => onCoverageChange(value[0])}
                max={100}
                min={10}
                step={5}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>10%</span>
                <span className="font-medium">{coveragePct}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="planting-month">Mês do plantio</Label>
            <Select
              value={plantingMonth.toString()}
              onValueChange={(value) =>
                onPlantingMonthChange(Number.parseInt(value))
              }
            >
              <SelectTrigger id="planting-month">
                <SelectValue placeholder="Selecionar mês" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value.toString()}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="harvest-month">Mês da colheita</Label>
            <Select
              value={harvestMonth.toString()}
              onValueChange={(value) =>
                onHarvestMonthChange(Number.parseInt(value))
              }
            >
              <SelectTrigger id="harvest-month">
                <SelectValue placeholder="Selecionar mês" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value.toString()}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

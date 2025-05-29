import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Crop } from '@/constants/policy';

interface CropSelectionProps {
  selectedCrop: Crop;
  onCropChange: (crop: Crop) => void;
}

export function CropSelection({
  selectedCrop,
  onCropChange,
}: CropSelectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seleciona Tipo de Cultivo</CardTitle>
        <CardDescription>Escolha o cultivo que deseja segurar</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedCrop}
          onValueChange={(value) => onCropChange(value as Crop)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <RadioGroupItem value="soy" id="soy" className="peer sr-only" />
            <Label
              htmlFor="soy"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <div className="mb-3 h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <div className="text-center">
                <p className="font-medium">Soja</p>
                <p className="text-sm text-gray-500">
                  Seguro para safra de soja
                </p>
              </div>
            </Label>
          </div>

          <div>
            <RadioGroupItem value="rice" id="rice" className="peer sr-only" />
            <Label
              htmlFor="rice"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <div className="mb-3 h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌾</span>
              </div>
              <div className="text-center">
                <p className="font-medium">Arroz</p>
                <p className="text-sm text-gray-500">
                  Seguro para safra de arroz
                </p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}

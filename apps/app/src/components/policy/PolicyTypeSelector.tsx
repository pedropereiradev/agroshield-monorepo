import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PolicyTypeInput } from '@/sway-contracts-api/contracts/InsuranceContract';
import { CloudRain, type LucideIcon, Sun, Thermometer } from 'lucide-react';

interface PolicyTypeSelectorProps {
  value: PolicyTypeInput;
  onChange: (value: PolicyTypeInput) => void;
}

export function PolicyTypeSelector({
  value,
  onChange,
}: PolicyTypeSelectorProps) {
  return (
    <RadioGroup
      value={value}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      onValueChange={(value) => onChange(value as PolicyTypeInput)}
    >
      <PolicyTypeOption
        id={PolicyTypeInput.Rainfall}
        name="Seguro contra chuvas"
        description="Proteção contra chuvas excessivas"
        Icon={CloudRain}
        colorClass="text-blue-600"
      />
      <PolicyTypeOption
        id={PolicyTypeInput.Temperature}
        name="Seguro contra temperaturas"
        description="Proteção contra temperaturas extremas."
        Icon={Thermometer}
        colorClass="text-orange-600"
      />
      <PolicyTypeOption
        id={PolicyTypeInput.Drought}
        name="Seguro contra secas"
        description="Proteção contra secas severas"
        Icon={Sun}
        colorClass="text-yellow-600"
      />
    </RadioGroup>
  );
}

interface PolicyTypeOptionProps {
  id: PolicyTypeInput;
  name: string;
  description: string;
  Icon: LucideIcon;
  colorClass: string;
}

function PolicyTypeOption({
  id,
  name,
  description,
  Icon,
  colorClass,
}: PolicyTypeOptionProps) {
  return (
    <div>
      <RadioGroupItem value={id} id={id} className="peer sr-only" />
      <Label
        htmlFor={id}
        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
      >
        <Icon className={`mb-3 h-6 w-6 ${colorClass}`} />
        <div className="text-center">
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </Label>
    </div>
  );
}

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { type PolicyType, policyTypes } from '@/utils/mocks';
import type { LucideIcon } from 'lucide-react';

interface PolicyTypeSelectorProps {
  value: PolicyType;
  onChange: (value: PolicyType) => void;
}

export function PolicyTypeSelector({
  value,
  onChange,
}: PolicyTypeSelectorProps) {
  return (
    <RadioGroup
      value={value}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      onValueChange={(value) => onChange(value as PolicyType)}
    >
      {policyTypes.map((type) => (
        <PolicyTypeOption
          key={type.id}
          id={type.id as PolicyType}
          name={type.name}
          description={type.description}
          Icon={type.icon}
          colorClass={type.color}
        />
      ))}
    </RadioGroup>
  );
}

interface PolicyTypeOptionProps {
  id: PolicyType;
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

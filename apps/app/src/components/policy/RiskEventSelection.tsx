import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { type Crop, type EventId, eventOptions } from '@/constants/policy';
import clsx from 'clsx';

interface RiskEventSelectionProps {
  crop: Crop;
  selectedEvent: EventId;
  onEventChange: (eventId: EventId) => void;
}

export function RiskEventSelection({
  crop,
  selectedEvent,
  onEventChange,
}: RiskEventSelectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Selecione o evento de risco</CardTitle>
        <CardDescription>
          Escolha o evento climático que você deseja proteção contra
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedEvent}
          onValueChange={(value) => onEventChange(value as EventId)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {eventOptions[crop].map((event) => (
            <div key={event.id}>
              <RadioGroupItem
                value={event.id}
                id={event.id}
                className="peer sr-only"
              />
              <Label
                htmlFor={event.id}
                className="flex items-center gap-3 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <event.icon className={clsx('h-6 w-6', event.iconColor)} />
                <div>
                  <p className="font-medium">{event.label}</p>
                  <p className="text-sm text-gray-500">{event.description}</p>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}

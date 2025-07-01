import { CloudRain, Sun, Thermometer } from 'lucide-react';

export type Crop = 'soy' | 'rice';
export type EventId =
  | 'soy_drought'
  | 'soy_flood'
  | 'soy_heat'
  | 'soy_cold'
  | 'rice_drought'
  | 'rice_flood'
  | 'rice_heat'
  | 'rice_cold';

export const eventOptions = {
  soy: [
    {
      id: 'soy_drought',
      label: 'Seca',
      description: 'Proteção contra falta de chuva',
      icon: Sun,
      iconColor: 'text-orange-600',
    },
    {
      id: 'soy_flood',
      label: 'Inundação',
      description: 'Proteção contra excesso de chuva',
      icon: CloudRain,
      iconColor: 'text-blue-600',
    },
    {
      id: 'soy_heat',
      label: 'Onda de Calor',
      description: 'Proteção contra temperaturas extremamente altas',
      icon: Thermometer,
      iconColor: 'text-orange-600',
    },
    // {
    //   id: 'soy_cold',
    //   label: 'Gelada',
    //   description: 'Proteção contra temperaturas extremamente baixas',
    //   icon: Thermometer,
    //   iconColor: 'text-blue-600',
    // },
  ],
  rice: [
    {
      id: 'rice_drought',
      label: 'Seca',
      description: 'Proteção contra falta de chuva',
      icon: Sun,
      iconColor: 'text-orange-600',
    },
    {
      id: 'rice_flood',
      label: 'Inundação',
      description: 'Proteção contra excesso de chuva',
      icon: CloudRain,
      iconColor: 'text-blue-600',
    },
    {
      id: 'rice_heat',
      label: 'Onda de Calor',
      description: 'Proteção contra temperaturas extremamente altas',
      icon: Thermometer,
      iconColor: 'text-orange-600',
    },
    // {
    //   id: 'rice_cold',
    //   label: 'Cold Snap',
    //   description: 'Proteção contra temperaturas extremamente baixas',
    //   icon: Thermometer,
    //   iconColor: 'text-blue-600',
    // },
  ],
};

export const months = [
  { value: 1, label: 'Janeiro' },
  { value: 2, label: 'Fevereiro' },
  { value: 3, label: 'Março' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Maio' },
  { value: 6, label: 'Junho' },
  { value: 7, label: 'Julho' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Setembro' },
  { value: 10, label: 'Outubro' },
  { value: 11, label: 'Novembro' },
  { value: 12, label: 'Dezembro' },
];

export const crops: { value: Crop; label: string }[] = [
  { value: 'soy', label: 'Soja' },
  { value: 'rice', label: 'Arroz' },
];

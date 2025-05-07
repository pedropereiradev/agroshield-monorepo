import { CloudRain, Leaf, Sun, Thermometer } from 'lucide-react';

export const policyTypes = [
  {
    id: 'rainfall',
    name: 'Seguro contra chuvas',
    description: 'Proteção contra chuvas excessivas',
    icon: CloudRain,
    color: 'text-blue-600',
  },
  {
    id: 'temperature',
    name: 'Seguro contra temperaturas',
    description: 'Proteção contra temperaturas extremas',
    icon: Thermometer,
    color: 'text-orange-600',
  },
  {
    id: 'drought',
    name: 'Seguro contra secas',
    description: 'Proteção contra secas severas',
    icon: Sun,
    color: 'text-yellow-600',
  },
];

export type PolicyType = 'rainfall' | 'temperature' | 'drought';

export const cropTypes = [
  { value: 'soybeans', label: 'Soja' },
  { value: 'rice', label: 'Arroz' },
];

export const seasons = [
  { value: 'spring', label: 'Primavera' },
  { value: 'summer', label: 'Verão' },
  { value: 'fall', label: 'Outono' },
  { value: 'winter', label: 'Inverno' },
];

export const policies = [
  {
    id: 'pol-001',
    cropType: 'Rice',
    policyType: 'Rainfall Insurance',
    icon: CloudRain,
    status: 'Active',
    coverageAmount: 2.5,
    premiumPaid: 0.125,
    startDate: '2025-01-15',
    endDate: '2025-07-15',
    progressPercentage: 25,
  },
  {
    id: 'pol-002',
    cropType: 'Corn',
    policyType: 'Temperature Insurance',
    icon: Thermometer,
    status: 'Active',
    coverageAmount: 3,
    premiumPaid: 0.15,
    startDate: '2025-02-01',
    endDate: '2025-08-01',
    progressPercentage: 30,
  },
  {
    id: 'pol-003',
    cropType: 'Soybeans',
    policyType: 'Yield Insurance',
    icon: Leaf,
    status: 'Pending',
    coverageAmount: 4,
    premiumPaid: 0.2,
    startDate: '2025-03-01',
    endDate: '2025-09-01',
    progressPercentage: 0,
  },
  {
    id: 'pol-004',
    cropType: 'Wheat',
    policyType: 'Rainfall Insurance',
    icon: CloudRain,
    status: 'Expired',
    coverageAmount: 2,
    premiumPaid: 0.1,
    startDate: '2024-08-01',
    endDate: '2025-02-01',
    progressPercentage: 100,
  },
];

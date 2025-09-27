import { z } from 'zod';

export const quoteFormSchema = z
  .object({
    // Insurance fields
    crop: z.enum(['soy', 'rice'], {
      message: 'Por favor, selecione uma cultura',
    }),
    triggerEvent: z
      .string()
      .min(1, 'Por favor, selecione um evento de cobertura'),
    areaHa: z
      .number({
        message: 'Área é obrigatória',
      })
      .min(0.1, 'Área mínima é 0.1 hectares')
      .max(10000, 'Área máxima é 10.000 hectares'),
    coveragePct: z
      .number()
      .min(10, 'Cobertura mínima é 10%')
      .max(100, 'Cobertura máxima é 100%'),
    plantingMonth: z.number().min(1).max(12),
    harvestMonth: z.number().min(1).max(12),
    latitude: z
      .number({
        message: 'Latitude é obrigatória',
      })
      .min(-90, 'Latitude deve estar entre -90 e 90')
      .max(90, 'Latitude deve estar entre -90 e 90'),
    longitude: z
      .number({
        message: 'Longitude é obrigatória',
      })
      .min(-180, 'Longitude deve estar entre -180 e 180')
      .max(180, 'Longitude deve estar entre -180 e 180'),

    // Contact fields
    firstName: z
      .string()
      .min(1, 'Nome é obrigatório')
      .min(2, 'Nome deve ter pelo menos 2 caracteres'),
    lastName: z
      .string()
      .min(1, 'Sobrenome é obrigatório')
      .min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
    email: z
      .string()
      .min(1, 'Email é obrigatório')
      .email('Email deve ter um formato válido'),
    telephone: z.string().optional(),
  })
  .refine(
    (data) => {
      // Ensure planting month is before harvest month (considering year cycle)
      if (data.plantingMonth >= data.harvestMonth) {
        return data.plantingMonth > 6; // Allow cases like planting in Oct/Nov, harvest in Mar/Apr
      }
      return true;
    },
    {
      message: 'Mês da colheita deve ser posterior ao mês do plantio',
      path: ['harvestMonth'],
    }
  );

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

// Event options for different crops
export const eventOptions = {
  soy: [
    { value: 'soy_drought', label: 'Seca' },
    { value: 'soy_flood', label: 'Enchente' },
    { value: 'soy_heat', label: 'Calor Excessivo' },
    { value: 'soy_cold', label: 'Frio Excessivo' },
  ],
  rice: [
    { value: 'rice_drought', label: 'Seca' },
    { value: 'rice_flood', label: 'Enchente' },
    { value: 'rice_heat', label: 'Calor Excessivo' },
    { value: 'rice_cold', label: 'Frio Excessivo' },
  ],
} as const;

// Months for select options
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
] as const;

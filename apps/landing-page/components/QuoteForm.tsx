'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { Loader2, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  type QuoteFormData,
  eventOptions,
  months,
  quoteFormSchema,
} from '../lib/validations/quote';

export default function QuoteForm() {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      areaHa: 0,
      coveragePct: 70,
      plantingMonth: 1,
      harvestMonth: 6,
      latitude: 0,
      longitude: 0,
      firstName: '',
      lastName: '',
      email: '',
      telephone: '',
    },
  });

  const watchedCrop = watch('crop');
  const watchedCoverage = watch('coveragePct');

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue('latitude', position.coords.latitude);
          setValue('longitude', position.coords.longitude);
          setIsLoadingLocation(false);
          toast.success('Localização obtida com sucesso!');
        },
        (_) => {
          setIsLoadingLocation(false);
          toast.error(
            'Erro ao obter localização. Por favor, insira manualmente.'
          );
        }
      );
    } else {
      setIsLoadingLocation(false);
      toast.error('Geolocalização não suportada pelo navegador.');
    }
  };

  const onSubmit = async (data: QuoteFormData) => {
    try {
      const response = await fetch('http://localhost:3001/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crop: data.crop,
          triggerEvent: data.triggerEvent,
          areaHa: data.areaHa,
          coveragePct: data.coveragePct / 100, // Convert percentage to decimal
          plantingMonth: data.plantingMonth,
          harvestMonth: data.harvestMonth,
          latitude: data.latitude,
          longitude: data.longitude,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get quote');
      }

      const quoteResult = await response.json();

      toast.success(
        `Cotação gerada! Prêmio: R$ ${quoteResult.premium.toFixed(2)} | Probabilidade: ${(quoteResult.probability * 100).toFixed(2)}%`
      );

      // Store contact data for follow-up (you might want to send this to a different endpoint)
      console.log('Contact data:', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        telephone: data.telephone,
      });

      reset();
    } catch (error: any) {
      console.error('Quote submission error:', error);
      toast.error('Erro ao solicitar cotação. Tente novamente.');
    }
  };

  const availableEvents = watchedCrop ? eventOptions[watchedCrop] : [];

  // Reset trigger event when crop changes
  const handleCropChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue('crop', e.target.value as 'soy' | 'rice');
    setValue('triggerEvent', '');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Solicitar Cotação de Seguro
          </h2>
          <p className="text-gray-600">
            Preencha as informações abaixo e receba uma cotação personalizada
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Informações da Safra
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="crop"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cultura *
                </label>
                <select
                  id="crop"
                  {...register('crop')}
                  onChange={handleCropChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.crop ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione a cultura</option>
                  <option value="soy">Soja</option>
                  <option value="rice">Arroz</option>
                </select>
                {errors.crop && (
                  <p className="flex items-center gap-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.crop.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="triggerEvent"
                  className="block text-sm font-medium text-gray-700"
                >
                  Evento de Cobertura *
                </label>
                <select
                  id="triggerEvent"
                  {...register('triggerEvent')}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.triggerEvent ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={!watchedCrop}
                >
                  <option value="">Selecione o evento</option>
                  {availableEvents.map((event) => (
                    <option key={event.value} value={event.value}>
                      {event.label}
                    </option>
                  ))}
                </select>
                {errors.triggerEvent && (
                  <p className="flex items-center gap-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.triggerEvent.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="areaHa"
                  className="block text-sm font-medium text-gray-700"
                >
                  Área Plantada (Hectares) *
                </label>
                <input
                  id="areaHa"
                  type="number"
                  {...register('areaHa', { valueAsNumber: true })}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.areaHa ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: 10.5"
                />
                {errors.areaHa && (
                  <p className="flex items-center gap-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.areaHa.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="coveragePct"
                  className="block text-sm font-medium text-gray-700"
                >
                  Porcentagem de Cobertura: {watchedCoverage}%
                </label>
                <input
                  id="coveragePct"
                  type="range"
                  {...register('coveragePct', { valueAsNumber: true })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>10%</span>
                  <span>100%</span>
                </div>
                {errors.coveragePct && (
                  <p className="flex items-center gap-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.coveragePct.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="plantingMonth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mês do Plantio *
                </label>
                <select
                  id="plantingMonth"
                  {...register('plantingMonth', { valueAsNumber: true })}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.plantingMonth ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                {errors.plantingMonth && (
                  <p className="flex items-center gap-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.plantingMonth.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="harvestMonth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mês da Colheita *
                </label>
                <select
                  id="harvestMonth"
                  {...register('harvestMonth', { valueAsNumber: true })}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.harvestMonth ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                {errors.harvestMonth && (
                  <p className="flex items-center gap-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.harvestMonth.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="block text-sm font-medium text-gray-700">
                  Localização da Propriedade *
                </span>
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={isLoadingLocation}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {isLoadingLocation ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}
                  {isLoadingLocation ? 'Obtendo...' : 'Usar Localização Atual'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="latitude"
                    className="block text-xs text-gray-600 mb-1"
                  >
                    Latitude *
                  </label>
                  <input
                    id="latitude"
                    type="number"
                    {...register('latitude', { valueAsNumber: true })}
                    className={`w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.latitude ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ex: -23.5505"
                  />
                  {errors.latitude && (
                    <p className="flex items-center gap-1 text-red-600 text-xs mt-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.latitude.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="longitude"
                    className="block text-xs text-gray-600 mb-1"
                  >
                    Longitude *
                  </label>
                  <input
                    id="longitude"
                    type="number"
                    {...register('longitude', { valueAsNumber: true })}
                    className={`w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.longitude ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ex: -46.6333"
                  />
                  {errors.longitude && (
                    <p className="flex items-center gap-1 text-red-600 text-xs mt-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.longitude.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Informações de Contato
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome *
                </label>
                <input
                  id="firstName"
                  type="text"
                  {...register('firstName')}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Seu primeiro nome"
                />
                {errors.firstName && (
                  <p className="flex items-center gap-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sobrenome *
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...register('lastName')}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Seu sobrenome"
                />
                {errors.lastName && (
                  <p className="flex items-center gap-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="seu.email@exemplo.com"
                />
                {errors.email && (
                  <p className="flex items-center gap-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="telephone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Telefone
                </label>
                <input
                  id="telephone"
                  type="tel"
                  {...register('telephone')}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.telephone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="(11) 99999-9999"
                />
                {errors.telephone && (
                  <p className="flex items-center gap-1 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.telephone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Enviando Cotação...
                </>
              ) : (
                'Solicitar Cotação Gratuita'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

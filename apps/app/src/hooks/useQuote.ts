import {
  type QuoteRequest,
  type QuoteResponse,
  requestQuote,
} from '@/services/quote';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export interface UseQuoteOptions {
  onSuccess?: (data: QuoteResponse) => void;
  onError?: (error: Error) => void;
}

export const useQuote = (options?: UseQuoteOptions) => {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);

  const mutation = useMutation({
    mutationFn: (quoteRequest: QuoteRequest) => requestQuote(quoteRequest),
    onSuccess: (data) => {
      setQuote(data);
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });

  const getQuote = async (quoteRequest: QuoteRequest) => {
    return mutation.mutateAsync(quoteRequest);
  };

  return {
    getQuote,
    quote,
    setQuote,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: () => {
      setQuote(null);
      mutation.reset();
    },
  };
};

export const validateQuoteRequest = (data: Partial<QuoteRequest>): boolean => {
  return !!(
    data.crop &&
    data.triggerEvent &&
    data.areaHa &&
    data.areaHa > 0 &&
    data.coveragePct !== undefined &&
    data.coveragePct >= 0 &&
    data.coveragePct <= 1 &&
    data.plantingMonth &&
    data.harvestMonth &&
    data.latitude !== undefined &&
    data.longitude !== undefined
  );
};

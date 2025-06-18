import type { AxiosError } from 'axios';
import api from '../config/api';
import type { QuoteRequest, QuoteResponse } from './types';

export const requestQuote = async (
  quoteData: QuoteRequest
): Promise<QuoteResponse> => {
  try {
    const response = await api.post<QuoteResponse>('/quotes', quoteData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(
      `Failed to get quote: ${axiosError.response?.data || axiosError.message}`
    );
  }
};

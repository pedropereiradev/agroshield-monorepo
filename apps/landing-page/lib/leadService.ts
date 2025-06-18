import api from './axios';

export interface LeadData {
  name: string;
  email: string;
  area: string;
  crop: string;
  city: string;
}

export const leadService = {
  async createLead(data: LeadData) {
    try {
      const response = await api.post('/leads', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar lead:', error);
      throw error;
    }
  },
}; 
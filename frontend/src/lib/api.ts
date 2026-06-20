import axios from 'axios';
import type {
  ChargebackCase,
  TimelineEvent,
  ChargebackStats,
  DisputeOutcomeStats,
  FilterState,
} from '@/types/index';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const client = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Error handling wrapper
const handleApiError = (error: any) => {
  console.error('API Error:', error);
  throw error;
};

export const api = {
  // Cases endpoints
  getCases: async (filters?: FilterState, limit: number = 50) => {
    try {
      const { data } = await client.get<ChargebackCase[]>('/api/cases', {
        params: {
  status: filters?.status,
  merchant: filters?.merchant,
  reason: filters?.reason,
  network: filters?.network,
  limit,
},
      });
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getCase: async (caseId: string) => {
    try {
      const { data } = await client.get<ChargebackCase>(`/api/cases/${caseId}`);
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getCaseTimeline: async (caseId: string) => {
    try {
      const { data } = await client.get<TimelineEvent[]>(`/api/cases/${caseId}/timeline`);
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Stats endpoints
  getStats: async () => {
    try {
      const { data } = await client.get<ChargebackStats>('/api/stats');
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getDisputeOutcomes: async () => {
    try {
      const { data } = await client.get<DisputeOutcomeStats>('/api/dispute-outcomes');
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Download endpoints
  downloadSampleData: async () => {
    try {
      const { data } = await client.get('/api/sample-data');
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },
};

export default api;

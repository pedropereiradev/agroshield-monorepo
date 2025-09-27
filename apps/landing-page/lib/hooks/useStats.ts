import { useEffect, useState } from 'react';
import type { ApiResponse, StatsResponse } from '../types/stats';

interface UseStatsState {
  stats: StatsResponse | null;
  loading: boolean;
  error: string | null;
}

const LEAD_COUNT = 0;
const LEAD_DISPLAY_COUNT = '0';

export function useStats() {
  const [state, setState] = useState<UseStatsState>({
    stats: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    async function fetchStats() {
      try {
        const response = await fetch('/api/stats', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<StatsResponse> = await response.json();

        if (mounted) {
          setState({
            stats: result.data || null,
            loading: false,
            error: result.error || null,
          });
        }
      } catch (error) {
        if (mounted) {
          setState({
            stats: {
              leadCount: LEAD_COUNT,
              displayCount: LEAD_DISPLAY_COUNT,
              lastUpdated: new Date().toISOString(),
            },
            loading: false,
            error:
              error instanceof Error ? error.message : 'Failed to fetch stats',
          });
        }
      }
    }

    fetchStats();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    displayCount: state.stats?.displayCount || LEAD_DISPLAY_COUNT,
    leadCount: state.stats?.leadCount || LEAD_COUNT,
    loading: state.loading,
    error: state.error,
    lastUpdated: state.stats?.lastUpdated,
  };
}

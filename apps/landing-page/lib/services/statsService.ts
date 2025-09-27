import { neon } from '@neondatabase/serverless';
import type { DatabaseQueryResult, StatsResponse } from '../types/stats';

class StatsService {
  private sql: ReturnType<typeof neon>;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is required');
    }
    this.sql = neon(process.env.DATABASE_URL);
  }

  async getLeadCount(): Promise<number> {
    try {
      const result = (await this.sql`
        SELECT COUNT(*) as total_leads
        FROM leads
        WHERE created_at IS NOT NULL
      `) as DatabaseQueryResult[];

      const count = Number(result[0]?.total_leads || 0);
      return Math.max(0, count);
    } catch (error) {
      console.error('Failed to fetch lead count:', error);
      throw new Error('Database query failed');
    }
  }

  async getStats(): Promise<StatsResponse> {
    const leadCount = await this.getLeadCount();

    return {
      leadCount,
      displayCount: leadCount > 0 ? `${leadCount}+` : '0+',
      lastUpdated: new Date().toISOString(),
    };
  }
}

// Singleton instance
export const statsService = new StatsService();

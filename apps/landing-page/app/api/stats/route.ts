import { type NextRequest, NextResponse } from 'next/server';
import { statsService } from '../../../lib/services/statsService';
import type { ApiResponse, StatsResponse } from '../../../lib/types/stats';

// Cache duration in seconds (5 minutes)
const CACHE_DURATION = 300;

export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiResponse<StatsResponse>>> {
  try {
    // Set cache headers
    const headers = {
      'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=60`,
      'Content-Type': 'application/json',
    };

    const stats = await statsService.getStats();

    return NextResponse.json(
      {
        data: stats,
        success: true,
      },
      {
        status: 200,
        headers,
      }
    );
  } catch (error) {
    console.error('Stats API error:', error);

    // Return fallback data with appropriate error response
    const fallbackStats: StatsResponse = {
      leadCount: 0,
      displayCount: '0+',
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        data: fallbackStats,
        error: 'Unable to fetch current stats, showing fallback data',
        success: false,
      },
      {
        status: 200, // Return 200 with fallback data instead of error
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}


import type { Country } from '@/domain/models/country'
import type { Metrics } from '@/domain/models/metrics';

export interface CountryMetricsResponse {
  statusCode: string;
  body: {
    country: Country;
    date: string; // ISO date string
    dataType: string;
    metrics: Metrics;
  };
}

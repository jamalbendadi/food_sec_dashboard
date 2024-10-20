
import type { CountryMetricsResponse } from '@/domain/models/countryMetricsResponse';
import type { IPCPeaksResponse } from '@/domain/models/ipcPeaksResponse';

export interface IMetricsRepository {
  getCountryMetrics(iso3: string): Promise<CountryMetricsResponse>;
  getIPCPeaks(year: number): Promise<IPCPeaksResponse>;
}

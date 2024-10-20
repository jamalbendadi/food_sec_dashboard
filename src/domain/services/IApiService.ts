
import type { Metrics } from '@/domain/models/metrics';
import { IpcPhaseMetrics } from '@/domain/models/ipcPhaseMetrics';

export interface IApiService {
  getMetrics(iso3: string): Promise<Metrics|null>;
  getIPCPeaks(year: number, iso: string): Promise<IpcPhaseMetrics|null>;
}

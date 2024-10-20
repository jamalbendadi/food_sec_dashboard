
import type { IApiService } from '@/domain/services/IApiService';
import type { IMetricsRepository } from '@/domain/repositories/IMetricsRepository';
import type { Metrics } from '@/domain/models/metrics';
import { MetricsRepository } from '@/infrastructure/MetricsRepository';
import { IpcPhaseMetrics } from '@/domain/models/ipcPhaseMetrics';
import { IPCPhaseBody } from '@/domain/models/ipcPhaseBody';

export class ApiService implements IApiService {
  private metricsRepository: IMetricsRepository;
  private _metricCache: Record<string, {loading: boolean, metrics: Metrics|null}> = {}
  private _ipcCache: Record<string, {loading: boolean, metrics: IpcPhaseMetrics|null}> = {}
  constructor() {
    this.metricsRepository = new MetricsRepository();
  }

/**
 * Fetches and transforms country metrics.
 * @param iso3 - ISO3 code of the country.
 * @returns Metrics data.
 */
  async getMetrics(iso3: string): Promise<Metrics|null> {
    if(this._metricCache[iso3]){
      return this._metricCache[iso3].metrics
    }
    this._metricCache[iso3] = {loading: true, metrics: null}
    const response = await this.metricsRepository.getCountryMetrics(iso3);
    if (response.statusCode !== '200') {
      throw new Error(`Failed to fetch metrics for country: ${iso3}`);
    }
    this._metricCache[iso3] = {loading: false, metrics: response.body.metrics };
    return response.body.metrics;
  }

  async getIPCPeaks(year: number, iso: string): Promise<IpcPhaseMetrics|null> {
    if(this._ipcCache[iso]){
      return this._ipcCache[iso].metrics
    }
    this._ipcCache[iso] = {loading: true, metrics: null}
    const ipcPeaks = await this.getIPCPeaksBody(year, iso);
    
    if(!ipcPeaks) return null;
    
    const result: IpcPhaseMetrics = {
      phase3: {people: ipcPeaks.phase_3_number, prevalence: ipcPeaks.phase_3_percent},
      phase4: {people: ipcPeaks.phase_4_number, prevalence: ipcPeaks.phase_4_percent},
      phase5: {people: ipcPeaks.phase_5_number, prevalence: ipcPeaks.phase_5_percent}
    }
    this._ipcCache[iso] = {loading: false, metrics: result };
    return result;
  }

  /**
 * Fetches IPC peaks data for a specific year.
 * @param year - The year for which to fetch IPC peaks.
 * @returns Array of IPCPhaseMetric.
 */
  private async getIPCPeaksBody(year: number, iso: string): Promise<IPCPhaseBody|null> {
    const response = await this.metricsRepository.getIPCPeaks(year);
    if (response.statusCode !== '200') {
      throw new Error(`Failed to fetch IPC peaks for year: ${year}`);
    }
    const phaseMetric = response.body.ipc_peaks.find(ipc_peak => ipc_peak.iso3 === iso)
    return phaseMetric ?? null;
  }
}

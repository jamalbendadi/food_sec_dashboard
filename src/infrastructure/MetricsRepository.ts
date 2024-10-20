import axios, { AxiosInstance } from 'axios';
import { IMetricsRepository } from '@/domain/repositories/IMetricsRepository';
import type { CountryMetricsResponse } from '@/domain/models/countryMetricsResponse';
import type { IPCPeaksResponse } from '@/domain/models/ipcPeaksResponse';

export class MetricsRepository implements IMetricsRepository {
  private axiosInstance: AxiosInstance;
  private readonly baseURL: string = import.meta.env.VITE_BASE_URL;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
  }

  async getCountryMetrics(iso3: string): Promise<CountryMetricsResponse> {
    try {
      const response = await this.axiosInstance.get<CountryMetricsResponse>(`/foodsecurity/country/${iso3}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching country metrics for ISO3: ${iso3}`, error);
      throw error;
    }
  }

  async getIPCPeaks(year: number): Promise<IPCPeaksResponse> {
    try {
      const response = await this.axiosInstance.get<IPCPeaksResponse>(`/ipc/peaks`, {
        params: { year },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching IPC peaks for year: ${year}`, error);
      throw error;
    }
  }
}

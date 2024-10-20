import { Metrics, PhaseData } from '@/types/metrics';

export interface CountryData {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
}

export interface HoverInfo {
  x: number;
  y: number;
  feature?: {
    properties: {
      admin: string;
    };
  };
  metrics: Metrics | null;
  phaseData: PhaseData | null;
}
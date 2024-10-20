
export interface IPCPhaseBody {
    iso3: string;
    country_name: string;
    analysis_type: string;
    analysis_date: string; // ISO date string
    analysis_period_from: string; // ISO date string
    analysis_period_to: string; // ISO date string
    analyzed_population_number: number;
    phase_3_number: number | null;
    phase_3_percent: number | null;
    phase_4_number: number | null;
    phase_4_percent: number | null;
    phase_5_number: number | null;
    phase_5_percent: number | null;
    phase_3_plus_number: number | null;
    phase_4_plus_number: number | null;
    source: string;
  }
  
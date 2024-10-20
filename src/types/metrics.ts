export interface MetricDetail {
    people: number | null;
    prevalence: number | null; // Represented as a decimal (e.g., 0.57 for 57%)
  }
  
  export interface PhaseMetricDetail extends MetricDetail {
    // Additional fields can be added here if needed
  }
  
  export interface Metrics {
    fcs: MetricDetail;
    rcsi: MetricDetail;
    healthAccess: MetricDetail;
    marketAccess: MetricDetail;
  }
  
  export interface PhaseData{
    phase3: PhaseMetricDetail | null;
    phase4: PhaseMetricDetail | null;
    phase5: PhaseMetricDetail | null;
  }
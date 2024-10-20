import type { MetricDetail } from "@/types/metrics";

export interface Metrics {
    fcs: MetricDetail;
    rcsi: MetricDetail;
    healthAccess: MetricDetail;
    marketAccess: MetricDetail;
  }
  
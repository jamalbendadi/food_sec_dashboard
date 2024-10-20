import React from 'react';
import type { HoverInfo } from '@/types/hoverInfo';
import type { MetricDetail, PhaseMetricDetail } from '@/types/metrics';
import * as Formatting from '@/lib/formatting'

interface MetricsTooltipProps {
  hoverInfo: HoverInfo;
}

const MetricsTooltip: React.FC<MetricsTooltipProps> = ({ hoverInfo }) => {
  
  if(!hoverInfo.metrics && !hoverInfo.phaseData || !hoverInfo.feature){
    return (<div className="tooltip" style={{ left: hoverInfo.x, top: hoverInfo.y }}>No information available</div>)
  }
  const { x, y, feature } = hoverInfo;

  
  const renderMetricDetail = (detail: MetricDetail)=>{
    if(!detail) return (<span>/</span>);
    if(!detail.people && !detail.prevalence) return (<span>/</span>);
    const peopleString = detail.people ? `(${detail.people} people)` : ""
    const prevalenceString = detail.prevalence ? `${(detail.prevalence * 100).toFixed(2)}%` : ""
    return (<span>{prevalenceString} {peopleString}</span>)
  }
  const renderPhaseMetric = (label: string, metric: PhaseMetricDetail | null) => {
    const prevalence = Formatting.formatPercentage(metric?.prevalence ?? null);
    const people = Formatting.formatPeople(metric?.people ?? null);
    if (prevalence === '' && people === '') {
      return (<div><strong>{label}:</strong>&nbsp;/</div>);
    }
    return (
      <div>
        <strong>{label}:</strong> {prevalence} ({people} people)
      </div>
    );
  };
  
  return (
    <div className="tooltip" style={{ left: x, top: y }}>
      <div><strong>Country:</strong> {feature.properties.admin}</div>
      
      <hr />
      
        {hoverInfo.metrics && (
        <div>
          <div><strong>Food Consumption Score (FCS):</strong> {renderMetricDetail(hoverInfo.metrics.fcs)}</div>
          <div><strong>Reduced Coping Strategy Index (RCSI):</strong> {renderMetricDetail(hoverInfo.metrics.rcsi)}</div>
          <div><strong>Health Access:</strong> {renderMetricDetail(hoverInfo.metrics.healthAccess)}</div>
          <div><strong>Market Access:</strong> {renderMetricDetail(hoverInfo.metrics.marketAccess)}</div>
        </div>)}
        {!hoverInfo.metrics && (<span>None (or loading)</span>)}
        <hr />
        {hoverInfo.phaseData && (
        <div>
          {renderPhaseMetric('Phase 3 (Crisis)', hoverInfo.phaseData.phase3)}
          {renderPhaseMetric('Phase 4 (Emergency)', hoverInfo.phaseData.phase4)}
          {renderPhaseMetric('Phase 5 (Famine)', hoverInfo.phaseData.phase5)}
        </div>)}
        {!hoverInfo.phaseData && (<span>None (or loading)</span>)}
    </div>
  );
};

export default MetricsTooltip;

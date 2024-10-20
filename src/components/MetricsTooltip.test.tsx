import { render, screen } from '@testing-library/react';
import MetricsTooltip from './MetricsTooltip';
import type { HoverInfo } from '@/types/hoverInfo';
import '@testing-library/jest-dom';
import { test, describe, expect } from 'vitest'

describe('MetricsTooltip Component', () => {

    const defaultHoverInfo: HoverInfo = {
        x: 100,
        y: 200,
        feature: { properties: { admin: 'Kenya' } },
        metrics: null,
        phaseData: null
    };

    test('renders tooltip with no information if metrics and phaseData are null', () => {
        render(<MetricsTooltip hoverInfo={defaultHoverInfo} />);

        // Check for "No information available" message
        const noInfoText = screen.getByText(/No information available/i);
        expect(noInfoText).toBeInTheDocument();
    });

    test('renders country name when feature is present', () => {
        const hoverInfoWithFeature = {
            ...defaultHoverInfo,
            feature: { properties: { admin: 'Nigeria' } },
        };

        render(<MetricsTooltip hoverInfo={hoverInfoWithFeature} />);

        // Check for the country name "Nigeria"
        const countryDiv = screen.getByText(/Country:/i).closest('div');
        let normalizedText = countryDiv?.textContent?.replace(/\s+/g, ' ').trim();
        expect(normalizedText).toBe('Country: Nigeria');
    });

    test('renders metric details when metrics are provided', () => {
        const hoverInfoWithMetrics = {
            ...defaultHoverInfo,
            metrics: {
                fcs: { people: 1000, prevalence: 0.57 },
                rcsi: { people: 500, prevalence: 0.42 },
                healthAccess: { people: null, prevalence: null },
                marketAccess: { people: 700, prevalence: 0.35 },
            }
        };

        render(<MetricsTooltip hoverInfo={hoverInfoWithMetrics} />);

        // Check for Food Consumption Score details
        const fcsDiv = screen.getByText(/Food Consumption Score \(FCS\)/i).closest('div');
        const normalizedFcsText = fcsDiv?.textContent?.replace(/\s+/g, ' ').trim();
        expect(normalizedFcsText).toBe('Food Consumption Score (FCS): 57.00% (1000 people)');

        // Normalize and check Reduced Coping Strategy Index (RCSI)
        const rcsiDiv = screen.getByText(/Reduced Coping Strategy Index \(RCSI\)/i).closest('div');
        const normalizedRcsiText = rcsiDiv?.textContent?.replace(/\s+/g, ' ').trim();
        expect(normalizedRcsiText).toBe('Reduced Coping Strategy Index (RCSI): 42.00% (500 people)');

        // Normalize and check Health Access (should render "/")
        const healthAccessDiv = screen.getByText(/Health Access:/i).closest('div');
        const normalizedHealthAccessText = healthAccessDiv?.textContent?.replace(/\s+/g, ' ').trim();
        expect(normalizedHealthAccessText).toBe('Health Access: /');

        // Normalize and check Market Access
        const marketAccessDiv = screen.getByText(/Market Access/i).closest('div');
        const normalizedMarketAccessText = marketAccessDiv?.textContent?.replace(/\s+/g, ' ').trim();
        expect(normalizedMarketAccessText).toBe('Market Access: 35.00% (700 people)');
    });

    test('renders phase data when phaseData is provided', () => {
        const hoverInfoWithPhaseData = {
            ...defaultHoverInfo,
            phaseData: {
                phase3: { people: 1000, prevalence: 0.3 },
                phase4: { people: null, prevalence: null },
                phase5: { people: 100, prevalence: 0.05 },
            },
        };

        render(<MetricsTooltip hoverInfo={hoverInfoWithPhaseData} />);

        // Phase 3 details
        const phase3Div = screen.getByText(/Phase 3 \(Crisis\)/i).closest('div');
        let normalizedText = phase3Div?.textContent?.replace(/\s+/g, ' ').trim();
        expect(normalizedText).toBe('Phase 3 (Crisis): 30.00% (1,000 people)');

        // Phase 4 details (should render "/")
        const phase4Div = screen.getByText(/Phase 4 \(Emergency\)/i).closest('div');
        normalizedText = phase4Div?.textContent?.replace(/\s+/g, ' ').trim();
        expect(normalizedText).toBe('Phase 4 (Emergency): /');

        // Phase 5 details
        // const phase5Text = screen.getByText(/Phase 5 \(Famine\): 5.00% \(100 people\)/i);
        const phase5Div = screen.getByText(/Phase 5 \(Famine\)/i).closest('div');
        normalizedText = phase5Div?.textContent?.replace(/\s+/g, ' ').trim();
        expect(normalizedText).toBe('Phase 5 (Famine): 5.00% (100 people)');
    });

    test('renders None or loading when metrics or phaseData is null', () => {
        const hoverInfo = {
            ...defaultHoverInfo,
            metrics: null,
            phaseData: {
                phase3: null,
                phase4: null,
                phase5: null,
            },
        };

        render(<MetricsTooltip hoverInfo={hoverInfo} />);

        // Check for "None (or loading)" text in metrics and phase data
        const metricsNoneText = screen.getByText(/None \(or loading\)/i);
        expect(metricsNoneText).toBeInTheDocument();

        const phaseNoneText = screen.getByText(/None \(or loading\)/i);
        expect(phaseNoneText).toBeInTheDocument();
    });
});

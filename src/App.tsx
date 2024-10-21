import React from 'react';
import Map, { Source, Layer, ViewStateChangeEvent } from 'react-map-gl';
import { dataLayer } from '@/lib/map-style'
import { ApiService } from '@/infrastructure/ApiService';
import africa_shape from '@/assets/africa_shapes/africa_shape_new.json';
import MetricsTooltip from './components/MetricsTooltip';
import type { HoverInfo } from '@/types/hoverInfo';
import Sidebar from './components/Sidebar';

const apiService = new ApiService();
function App() {
  const [viewState, setViewState] = React.useState({
    longitude: 20,
    latitude: -5,
    zoom: 2.5
  });
  const [hoverInfo, setHoverInfo] = React.useState<HoverInfo | null>(null);
  const currentIso = React.useRef<string>("");
  const onMove = React.useCallback(async (event: ViewStateChangeEvent) => {
    setHoverInfo(null)
    setViewState(event.viewState)
  }, [])

  const onHover = React.useCallback(async (event: any) => {
    const { features, point: { x, y } } = event;
    const hoveredFeature = features && features[0];
    if (!hoveredFeature) {
      setHoverInfo(null);
      return;
    }
    const iso = hoveredFeature.properties.iso_a3;
    currentIso.current = iso;
    try {
      const [metrics, phaseData] = await Promise.all([
        apiService.getMetrics(iso),
        apiService.getIPCPeaks(2024, iso)
      ]);

      if(currentIso.current !== iso) {return};
      setHoverInfo({ feature: hoveredFeature, x, y, metrics, phaseData });
    }
    catch (e) {
      setHoverInfo({feature: hoveredFeature, x, y, metrics: null, phaseData: null})
    }
  }, []);


  return (
    <>
    <div style={{height: '100%', width: '100%'}} data-testid="map">
      <Map reuseMaps
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        {...viewState}
        onMove={onMove}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onMouseMove={onHover}
        onTouchEnd={onHover}
        interactiveLayerIds={['data']}

      >
        <Source id="africa" type="geojson" data={africa_shape} promoteId="iso_a3">
          <Layer {...dataLayer} />
        </Source>
        {hoverInfo && (
          <MetricsTooltip hoverInfo={hoverInfo} />
        )}
      </Map>
    </div>
    <Sidebar/>
    </>
  )
}

export default App
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface MapProps {
  onTokenProvided?: (token: string) => void;
}

const Map: React.FC<MapProps> = ({ onTokenProvided }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('pk.eyJ1IjoiZGVmYXVsdC10b2tlbiIsImEiOiJjbGo5cTJwZjcwNnloM3FxcGg2YzJ5czI2In0.kP2mKvJ4sG8R7J9X1qN8_Q'); // Default token
  const [tokenInput, setTokenInput] = useState<string>('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(false);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || isMapInitialized) return;

    mapboxgl.accessToken = token;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        projection: { name: 'globe' },
        zoom: 10,
        center: [3.3792, 6.5244], // Lagos, Nigeria coordinates
        pitch: 45,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.on('style.load', () => {
        map.current?.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 200, 225)',
          'horizon-blend': 0.2,
        });

        // Add sample property markers
        const properties = [
          { lng: 3.3792, lat: 6.5244, title: 'Property in Victoria Island' },
          { lng: 3.4219, lat: 6.4474, title: 'Property in Lekki' },
          { lng: 3.3547, lat: 6.5833, title: 'Property in Ikeja' },
        ];

        properties.forEach((property) => {
          const popup = new mapboxgl.Popup({ offset: 25 }).setText(property.title);
          
          new mapboxgl.Marker({ color: '#8B5CF6' })
            .setLngLat([property.lng, property.lat])
            .setPopup(popup)
            .addTo(map.current!);
        });
      });

      setIsMapInitialized(true);
      onTokenProvided?.(token);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.trim()) {
      setMapboxToken(tokenInput.trim());
      initializeMap(tokenInput.trim());
    }
  };

  useEffect(() => {
    // Try to initialize with default token
    if (mapboxToken && !isMapInitialized) {
      initializeMap(mapboxToken);
    }
    
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, isMapInitialized]);

  if (showTokenInput) {
    return (
      <div className="h-96 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center rounded-lg">
        <div className="text-center p-8 max-w-md">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Mapbox Integration
          </h3>
          <p className="text-muted-foreground mb-6">
            Enter your Mapbox public token to enable interactive mapping. 
            Get your token from{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJ..."
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="w-full"
            />
            <Button type="submit" className="w-full">
              Initialize Map
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      {!isMapInitialized && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Property Map View</p>
            <Button 
              variant="outline" 
              onClick={() => setShowTokenInput(true)}
              className="text-sm"
            >
              Add Your Mapbox Token
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface GoogleMapProps {
  onTokenProvided?: (token: string) => void;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ onTokenProvided }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [apiKey] = useState<string>('AIzaSyAA1eHSvXBZAsnM8pWrlqaqTpp_4CPTMiA');
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const initializeMap = (key: string) => {
    if (!mapContainer.current || isMapInitialized || !key) return;

    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
    script.async = true;
    script.defer = true;

    // Create global callback
    window.initMap = () => {
      if (!mapContainer.current) return;

      try {
        // Lagos, Nigeria coordinates
        const lagos = { lat: 6.5244, lng: 3.3792 };

        map.current = new window.google.maps.Map(mapContainer.current, {
          zoom: 11,
          center: lagos,
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry.fill',
              stylers: [{ weight: '2.00' }]
            },
            {
              featureType: 'all',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#9c9c9c' }]
            },
            {
              featureType: 'all',
              elementType: 'labels.text',
              stylers: [{ visibility: 'on' }]
            }
          ]
        });

        // Add sample property markers
        const properties = [
          { lat: 6.4474, lng: 3.4219, title: 'Luxury Apartment in Lekki' },
          { lat: 6.5244, lng: 3.3792, title: 'Modern House in Victoria Island' },
          { lat: 6.5833, lng: 3.3547, title: 'Commercial Property in Ikeja' },
          { lat: 6.4281, lng: 3.4219, title: 'Penthouse in Lekki Phase 1' },
          { lat: 6.5355, lng: 3.3087, title: 'Duplex in Ikoyi' }
        ];

        properties.forEach((property) => {
          const marker = new window.google.maps.Marker({
            position: { lat: property.lat, lng: property.lng },
            map: map.current,
            title: property.title,
            icon: {
              url: 'data:image/svg+xml;base64,' + btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#8B5CF6">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(32, 32)
            }
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 8px; min-width: 200px;">
                <h3 style="margin: 0 0 8px 0; color: #333; font-size: 14px; font-weight: 600;">${property.title}</h3>
                <p style="margin: 0; color: #666; font-size: 12px;">Lagos, Nigeria</p>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(map.current, marker);
          });
        });

        setIsMapInitialized(true);
        onTokenProvided?.(key);
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
      }
    };

    document.head.appendChild(script);
  };

  useEffect(() => {
    // Auto-initialize with the provided API key
    if (apiKey && !isMapInitialized) {
      initializeMap(apiKey);
    }
    
    return () => {
      // Cleanup
      const scripts = document.querySelectorAll('script[src*="maps.googleapis.com"]');
      scripts.forEach(script => script.remove());
      delete window.initMap;
    };
  }, [apiKey, isMapInitialized]);

  return (
    <div className="relative w-full h-96">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      {!isMapInitialized && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <p className="text-muted-foreground">Loading Lagos Property Map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
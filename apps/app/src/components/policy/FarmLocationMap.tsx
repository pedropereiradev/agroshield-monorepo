import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import L from 'leaflet';
import { Crosshair, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

// biome-ignore lint/performance/noDelete: <explanation>
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface FarmLocationMapProps {
  latitude: number;
  longitude: number;
  onLatitudeChange: (value: number) => void;
  onLongitudeChange: (value: number) => void;
}

function MapClickHandler({
  onLocationChange,
}: {
  onLocationChange: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationChange(lat, lng);
    },
  });
  return null;
}

export function FarmLocationMap({
  latitude,
  longitude,
  onLatitudeChange,
  onLongitudeChange,
}: FarmLocationMapProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    latitude || -23.55052,
    longitude || -46.633309,
  ]);
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([
    latitude || -23.55052,
    longitude || -46.633309,
  ]);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const newPosition: [number, number] = [latitude, longitude];
      setMarkerPosition(newPosition);
      setMapCenter(newPosition);
    }
  }, [latitude, longitude]);

  const handleMapClick = (lat: number, lng: number) => {
    const newPosition: [number, number] = [lat, lng];
    setMarkerPosition(newPosition);
    onLatitudeChange(lat);
    onLongitudeChange(lng);
  };

  const handleInputChange = (lat: number, lng: number) => {
    if (lat && lng) {
      const newPosition: [number, number] = [lat, lng];
      setMarkerPosition(newPosition);
      setMapCenter(newPosition);

      if (mapRef.current) {
        mapRef.current.setView(newPosition, mapRef.current.getZoom());
      }
    }
  };

  const handleLatitudeInputChange = (value: number) => {
    onLatitudeChange(value);
    handleInputChange(value, longitude);
  };

  const handleLongitudeInputChange = (value: number) => {
    onLongitudeChange(value);
    handleInputChange(latitude, value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Localização da fazenda
        </CardTitle>
        <CardDescription>
          Clique no mapa ou insira as coordenadas para definir a localização da
          sua fazenda
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              type="number"
              min="-90"
              max="90"
              step="0.000001"
              placeholder="e.g., -23.550520"
              value={latitude || ''}
              onChange={(e) =>
                handleLatitudeInputChange(
                  Number.parseFloat(e.target.value) || 0
                )
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              type="number"
              min="-180"
              max="180"
              step="0.000001"
              placeholder="e.g., -46.633309"
              value={longitude || ''}
              onChange={(e) =>
                handleLongitudeInputChange(
                  Number.parseFloat(e.target.value) || 0
                )
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Selecione no mapa</Label>
          <div className="rounded-lg overflow-hidden border border-border h-[400px] relative">
            <MapContainer
              center={mapCenter}
              zoom={10}
              style={{ height: '100%', width: '100%' }}
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {latitude && longitude && <Marker position={markerPosition} />}

              <MapClickHandler onLocationChange={handleMapClick} />
            </MapContainer>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <Crosshair className="h-6 w-6 text-primary opacity-50" />
            </div>
          </div>
        </div>

        <div className="p-3 bg-blue-50 rounded-md flex items-start gap-2">
          <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-900">Como usar</p>
            <ul className="text-blue-700 mt-1 space-y-1">
              <li>
                - Clique no mapa para selecionar a localização da sua fazenda
              </li>
              <li>
                - Use os campos de entrada para inserir coordenadas específicas
              </li>
              <li>- Arraste o mapa para navegar e encontrar sua propriedade</li>
              <li>
                - Coordenadas precisas garantem dados meteorológicos exatos
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

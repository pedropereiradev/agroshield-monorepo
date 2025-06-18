import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface FarmLocationProps {
  latitude: number;
  onLatitudeChange: (value: number) => void;
  longitude: number;
  onLongitudeChange: (value: number) => void;
}

export function FarmLocation({
  latitude,
  onLatitudeChange,
  longitude,
  onLongitudeChange,
}: FarmLocationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Localização da fazenda</CardTitle>
        <CardDescription>
          Coordenadas precisas para monitoramento de dados climáticos
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                onLatitudeChange(Number.parseFloat(e.target.value) || 0)
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
                onLongitudeChange(Number.parseFloat(e.target.value) || 0)
              }
            />
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-md flex items-start gap-2">
          <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-900">Precisão da localização</p>
            <p className="text-blue-700">
              Coordenadas precisas garantem monitoramento de dados climáticos
              precisos para sua localização específica.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

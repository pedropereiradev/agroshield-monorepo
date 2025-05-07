import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cropTypes, seasons } from '@/utils/mocks';

interface FarmDetailsFormProps {
  cropType: string;
  setCropType: (value: string) => void;
  farmArea: string;
  setFarmArea: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  season: string;
  setSeason: (value: string) => void;
}

export function FarmDetailsForm({
  cropType,
  setCropType,
  farmArea,
  setFarmArea,
  location,
  setLocation,
  season,
  setSeason,
}: FarmDetailsFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="crop">Cultura cultivada</Label>
        <Select value={cropType} onValueChange={setCropType}>
          <SelectTrigger id="crop">
            <SelectValue placeholder="Selecione a cultura" />
          </SelectTrigger>
          <SelectContent>
            {cropTypes.map((crop) => (
              <SelectItem key={crop.value} value={crop.value}>
                {crop.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="area">Área da Fazenda (Hectares)</Label>
        <Input
          id="area"
          type="number"
          placeholder="Digite a área"
          value={farmArea}
          onChange={(e) => setFarmArea(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Localização da Fazenda</Label>
        <Input
          id="location"
          placeholder="Digite a localização"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="season">Temporada de Cultivo</Label>
        <Select value={season} onValueChange={setSeason}>
          <SelectTrigger id="season">
            <SelectValue placeholder="Selecione a temporada" />
          </SelectTrigger>
          <SelectContent>
            {seasons.map((season) => (
              <SelectItem key={season.value} value={season.value}>
                {season.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

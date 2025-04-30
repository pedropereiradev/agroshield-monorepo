import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão geral</TabsTrigger>
          <TabsTrigger value="policies">Minhas apólices</TabsTrigger>
          <TabsTrigger value="rewards">Resgates</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p>Visão geral</p>
        </TabsContent>
        <TabsContent value="policies">
          <p>Minhas apólices</p>
        </TabsContent>
        <TabsContent value="rewards">
          <p>Resgates</p>
        </TabsContent>
      </Tabs>
      <div>
        <Button
          onClick={() => {
            navigate('/new-policy');
          }}
        >
          Nova Apólice
        </Button>
      </div>
    </div>
  );
}

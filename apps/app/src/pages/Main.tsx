import { Claims } from '@/components/main/tabs/Claims';
import { Overview } from '@/components/main/tabs/Overview';
import { Policies } from '@/components/main/tabs/Policies';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <section className="flex items-center justify-between px-4 py-8">
        <h1 className="scroll-m-20 text-lg font-extrabold tracking-tight lg:text-4xl">
          Painel do agricultor
        </h1>
        <Button
          size="lg"
          onClick={() => {
            navigate('/new-policy');
          }}
        >
          Nova Apólice de Seguro
        </Button>
      </section>
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão geral</TabsTrigger>
          <TabsTrigger value="policies">Minhas apólices</TabsTrigger>
          <TabsTrigger value="claims">Resgates</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Overview />
        </TabsContent>
        <TabsContent value="policies" className="space-y-6">
          <Policies />
        </TabsContent>
        <TabsContent value="claims" className="space-y-6">
          <Claims />
        </TabsContent>
      </Tabs>
    </div>
  );
}

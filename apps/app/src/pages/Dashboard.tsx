import { Overview } from '@/components/dashboard/tabs/Overview';
import { Policies } from '@/components/dashboard/tabs/Policies';
import { Rewards } from '@/components/dashboard/tabs/Rewards';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
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
          <TabsTrigger value="rewards">Resgates</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Overview />
        </TabsContent>
        <TabsContent value="policies" className="space-y-6">
          <Policies />
        </TabsContent>
        <TabsContent value="rewards" className="space-y-6">
          <Rewards />
        </TabsContent>
      </Tabs>
    </div>
  );
}

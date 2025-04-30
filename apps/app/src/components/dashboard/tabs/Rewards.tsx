import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function Rewards() {
  return (
    // <div className="flex flex-col gap-4">
    //   <h1 className="scroll-m-20 text-lg font-extrabold tracking-tight lg:text-4xl">
    //     Resgates
    //   </h1>
    //   <p>
    //     Aqui você pode visualizar informações sobre os resgates disponíveis e
    //     como utilizá-los.
    //   </p>
    // </div>
    <Card>
      <CardHeader>
        <CardTitle>Resgates</CardTitle>
        <CardDescription>
          Aqui você pode visualizar o histórico de todos resgates solicitados e
          o status de cada um deles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Add content or components related to policies here */}
        <p>Você pode também verificar os detalhes de cada resgate.</p>
      </CardContent>
    </Card>
  );
}

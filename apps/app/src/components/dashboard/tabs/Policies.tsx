import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function Policies() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Minhas Apólices</CardTitle>
        <CardDescription>
          Todas as suas apólices de seguro ativas e passadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Add content or components related to policies here */}
        <p>Suas apolices de seguro irao aparecer aqui</p>
      </CardContent>
    </Card>
  );
}

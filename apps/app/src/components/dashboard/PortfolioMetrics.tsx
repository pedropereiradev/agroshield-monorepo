import { Card, CardContent } from '@/components/ui/card';
import { useClaims } from '@/hooks/useClaims';
import { usePolicies } from '@/hooks/usePolicies';
import { formatMicroUnits } from '@/utils/currency';
import { AlertCircle, DollarSign, Shield, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  isLoading?: boolean;
}

function MetricCard({
  title,
  value,
  icon,
  description,
  isLoading,
}: MetricCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            {isLoading ? (
              <div className="h-8 w-24 bg-muted animate-pulse rounded" />
            ) : (
              <p className="text-3xl font-bold">{value}</p>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <div className="p-3 bg-primary/10 rounded-lg">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PortfolioMetrics() {
  const { policies, isLoading: isPoliciesLoading } = usePolicies();
  const { claims, isLoading: isClaimsLoading } = useClaims();

  const metrics = useMemo(() => {
    const activePolicies = policies.filter((p) => p.status === 'Active');
    const totalCoverage = activePolicies.reduce(
      (sum, p) => sum + p.coverageAmount,
      0
    );
    const totalPremiums = policies.reduce((sum, p) => sum + p.premiumPaid, 0);
    const pendingClaims = claims.filter(
      (c) => c.newStatus === 'Claimed' || c.newStatus === 'Active'
    ).length;

    return {
      activePolicies: activePolicies.length,
      totalCoverage,
      totalPremiums,
      pendingClaims,
    };
  }, [policies, claims]);

  const isLoading = isPoliciesLoading || isClaimsLoading;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Apólices Ativas"
        value={metrics.activePolicies}
        icon={<Shield className="h-6 w-6 text-primary" />}
        description="Cobertura em vigor"
        isLoading={isLoading}
      />
      <MetricCard
        title="Cobertura Total"
        value={formatMicroUnits(metrics.totalCoverage)}
        icon={<DollarSign className="h-6 w-6 text-primary" />}
        description="Valor segurado"
        isLoading={isLoading}
      />
      <MetricCard
        title="Prêmios Pagos"
        value={formatMicroUnits(metrics.totalPremiums)}
        icon={<TrendingUp className="h-6 w-6 text-primary" />}
        description="Total investido"
        isLoading={isLoading}
      />
      <MetricCard
        title="Sinistros Pendentes"
        value={metrics.pendingClaims}
        icon={<AlertCircle className="h-6 w-6 text-primary" />}
        description="Aguardando análise"
        isLoading={isLoading}
      />
    </div>
  );
}

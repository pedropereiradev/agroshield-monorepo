import { useClaimsByPolicyOwner } from '@agroshield/graphql-queries';
import type { Claims } from '@agroshield/graphql-types';
import { useWallet } from '@fuels/react';
import { DateTime } from 'fuels';
import { useMemo } from 'react';

export interface Claim {
  id: string;
  policyId: string;
  policyDbId: string;
  timestamp: string;
  oldStatus: string;
  newStatus: string;
  formattedDate: string;
  timeAgo: string;
}

export function useClaims() {
  const { wallet } = useWallet();
  const ownerAddress = wallet?.address.toB256();

  const {
    data: rawClaims,
    isLoading,
    error: queryError,
    refetch,
  } = useClaimsByPolicyOwner(ownerAddress);

  const formatDate = (dateString: string) => {
    const formattedDate = DateTime.fromTai64(dateString).toDateString();

    const date = new Date(formattedDate);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInDays > 0) {
      return `${diffInDays} dia${diffInDays > 1 ? 's' : ''} atrás`;
    }
    if (diffInHours > 0) {
      return `${diffInHours} hora${diffInHours > 1 ? 's' : ''} atrás`;
    }
    if (diffInMinutes > 0) {
      return `${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''} atrás`;
    }
    return 'Agora';
  };

  const claims = useMemo(() => {
    if (!rawClaims) return [];

    return rawClaims.map(
      (claim: Claims): Claim => ({
        id: claim.id,
        //@ts-ignore
        policyId: claim.policy.policyId,
        //@ts-ignore
        policyDbId: claim.policy.id,
        timestamp: claim.timestamp,
        oldStatus: claim.oldStatus,
        newStatus: claim.newStatus,
        formattedDate: formatDate(claim.timestamp),
        timeAgo: getTimeAgo(claim.timestamp),
      })
    );
  }, [rawClaims]);

  return {
    claims,
    isLoading,
    error: queryError?.message || null,
    refetch,
  };
}

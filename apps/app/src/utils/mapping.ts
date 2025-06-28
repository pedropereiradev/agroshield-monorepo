const statusColors = {
  Pending: { background: 'bg-yellow-100', text: 'text-yellow-800' },
  Active: { background: 'bg-green-100', text: 'text-green-800' },
  Inactive: { background: 'bg-red-100', text: 'text-red-800' },
  Approved: { background: 'bg-blue-100', text: 'text-blue-800' },
  Rejected: { background: 'bg-red-100', text: 'text-red-800' },
  Claimed: { background: 'bg-purple-100', text: 'text-purple-800' },
  Expired: { background: 'bg-gray-100', text: 'text-gray-800' },
};

const mappedStatus = {
  Pending: 'Pendente',
  Active: 'Ativo',
  Inactive: 'Inativo',
  Approved: 'Aprovado',
  Rejected: 'Rejeitado',
  Claimed: 'Resgatado',
  Expired: 'Expirado',
};

const mappedPolicyType = {
  Rainfall: 'Chuva',
  Temperature: 'Temperatura',
  Drought: 'Seca',
  Flood: 'Inundação',
};

export const getStatusLabel = (status: string): string => {
  return mappedStatus[status as keyof typeof mappedStatus] || status;
};

export const getStatusColor = (status: string) => {
  return (
    statusColors[status as keyof typeof statusColors] || {
      background: 'bg-gray-100',
      text: 'text-gray-800',
    }
  );
};

export const getPolicyLabel = (policyType: string): string => {
  return (
    mappedPolicyType[policyType as keyof typeof mappedPolicyType] || policyType
  );
};

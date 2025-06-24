import { useIsConnected } from '@fuels/react';
import type React from 'react';
import { Navigate } from 'react-router-dom';
import { Header } from '../header/Header';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isConnected, isLoading } = useIsConnected();

  if (!isConnected && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="bg-background">
      <Header />
      {children}
    </section>
  );
}

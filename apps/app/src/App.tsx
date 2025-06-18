import { useIsConnected } from '@fuels/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/layout/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NewPolicy from './pages/NewPolicy';

export default function App() {
  const { isConnected, isLoading } = useIsConnected();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={isConnected ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/new-policy"
        element={
          <PrivateRoute>
            <NewPolicy />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

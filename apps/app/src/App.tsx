import { useIsConnected } from '@fuels/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/layout/PrivateRoute';
import Login from './pages/Login';
import Main from './pages/Main';
import NewClaim from './pages/NewClaim';
import NewPolicy from './pages/NewPolicy';

export default function App() {
  const { isConnected, isLoading } = useIsConnected();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={isConnected ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Main />
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
      <Route
        path="/new-claim"
        element={
          <PrivateRoute>
            <NewClaim />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

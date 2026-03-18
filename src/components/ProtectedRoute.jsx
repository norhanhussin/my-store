import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

function ProtectedRoute({ children }) {
  const token = useAuthStore(state => state.token);

  // لو مفيش token → روح /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
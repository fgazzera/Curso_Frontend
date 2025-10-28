import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../utils/AuthHook";

export default function PublicRoute() {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : <Outlet />;
}
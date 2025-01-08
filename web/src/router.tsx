import { useAuth } from "@/context/AuthContext";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Events from "@/components/Events";

interface RouteProps {
    element: JSX.Element;
}

const ProtectedRoute: React.FC<RouteProps> = ({ element }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    return element;
}

const GuestRoute: React.FC<RouteProps> = ({ element }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }

    if (user) {
        return <Navigate to="/" />
    }

    return element;
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute element={<Events />} />
    },
    {
        path: '/register',
        element: <GuestRoute element={<Register />} />,
    },
    {
        path: '/login',
        element: <GuestRoute element={<Login />} />,
    },
]);

export default router;

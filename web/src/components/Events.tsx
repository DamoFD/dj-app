import { useAuth } from "@/context/AuthContext";
import axiosClient from "@/axios-client";

const Events: React.FC = () => {

    const { user, fetchUser } = useAuth();

    const handleLogout = async () => {
        try {
            await axiosClient.post('/logout');
            localStorage.removeItem('auth_token');
            await fetchUser();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Events</h1>
            <p>Hello, {user?.artist_name}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Events;

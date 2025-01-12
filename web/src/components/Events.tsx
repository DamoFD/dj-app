import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axiosClient from "@/axios-client";
import DefaultUser from "@/assets/default-user.jpg";
import { MdOutlineEmail } from "react-icons/md";

interface Event {
    id: string;
    title: string;
    date: string;
    image: string;
    user: {
        id: string;
        artist_name: string;
    }
    created_at: string;
    updated_at: string;
}

const Events: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const { user, fetchUser } = useAuth();

    const handleLogout = async () => {
        try {
            await axiosClient.post('/logout');
            localStorage.removeItem('auth_token');
            await fetchUser();
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axiosClient.get('/events');
            console.log("Fetched Events:", response.data.data);
            setEvents(response.data.data);
        } catch (error) {
            console.error("Fetch Events Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white h-screen relative">
            <img src={DefaultUser} alt="default user" className="w-full absolute top-0 left-0" />
            <div className="bg-white relative top-1/2 h-1/2 rounded-t-xl flex flex-col items-center">
                <h1 className="text-4xl font-extrabold mt-4">{user?.artist_name}</h1>
                <div className="flex space-x-2 items-center text-gray-600">
                    <MdOutlineEmail />
                    <span className="text-lg">{user?.email}</span>
                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {events.length > 0 ? (
                        <ul>
                            {events.map((event) => (
                                <li key={event.id}>{event?.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No events found</p>
                    )}
                </>
            )}
        </div>
    );
};

export default Events;


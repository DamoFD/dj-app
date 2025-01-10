import { handleEnter } from "@/utils/keyDown";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import MusicImage from "@/assets/Music.svg";
import { useRegisterService } from "@/hooks/registerService";

interface RegisterConfirmationProps {
    payload: any;
    setPayload: any;
    setCurrentPage: any;
}

const RegisterConfirmation: React.FC<RegisterConfirmationProps> = ({ payload, setCurrentPage }) => {

    const { register, errors, loading } = useRegisterService();

    const handleSubmit = async () => {
        try {
            // post request to server
            await register(payload);
        } catch (e) {
            // log any errors
            console.error("login failed:", e);
        }
    }

    return (
        <div
            className="bg-white w-full h-screen p-6"
            onKeyDown={e => handleEnter(e, handleSubmit)}
        >
            {/* Back button */}
            <FaArrowLeft
                onClick={() => setCurrentPage(3)}
                className="text-xl cursor-pointer"
            />

            <div className="flex flex-col items-center w-full mt-6">

                {/* Header */}
                <h1 className="text-4xl font-extrabold text-center">Information Confirmation</h1>

                {/* Hero */}
                <img
                    src={MusicImage}
                    alt="music image"
                    className="w-full"
                />

                {/* Info List */}
                <div className="flex flex-col gap-8 w-full px-8">

                    {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}

                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold">Name</h2>
                        <p className="text-lg">{payload.artist_name}</p>
                        {errors.artist_name && <p className="text-red-500 text-sm">{errors.artist_name}</p>}
                        <button onClick={() => setCurrentPage(3)}>Change Name</button>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold">Email</h2>
                        <p className="text-lg">{payload.email}</p>
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        <button onClick={() => setCurrentPage(1)}>Change Email</button>
                    </div>

                    <div className="flex flex-col gap-4">
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        <button onClick={() => setCurrentPage(2)}>Change Password</button>
                    </div>

                    {/* register button */}
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <button
                            className="w-full rounded-full py-2 font-bold mt-10 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    )}

                </div>
                <p className="text-center mt-6 text-sm">Already have an account? <Link to="/login" className="text-blue-600 cursor-pointer">Login</Link></p>
            </div>
        </div>
    );
}

export default RegisterConfirmation;

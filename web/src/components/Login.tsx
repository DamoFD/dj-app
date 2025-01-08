import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import MusicImage from "@/assets/Music.svg";
import Input from "@/components/Input";
import { useState } from "react";
import { useLoginService } from "@/hooks/loginService";
import { handleEnter } from "@/utils/keyDown";

/* Provides the user a login form
*
* @returns React.FC
*
* @since 0.0.1
*/
const Login: React.FC = () => {
    // login service makes the post request to the server
    // errors and loading states are managed by the useLoginService hook
    const { login, errors, loading } = useLoginService();

    // show password state
    const [showPassword, setShowPassword] = useState(false);

    // state for the login form
    const [payload, setPayload] = useState({
        email: '',
        password: '',
    });

    // react router dom navigation
    const navigate = useNavigate();

    // goes back to the previous page
    const goBack = () => {
        navigate(-1);
    }

    /**
    * Submit handler for the login form
    *
    * @returns void
    *
    * @since 0.0.1
    */
    const handleSubmit = async () => {
        try {
            // post request to server
            await login(payload);
        } catch (e) {
            // log any errors
            console.error("login failed:", e);
        } finally {
            // reset password input
            setPayload({ ...payload, password: '' });
        }
    }

    return (
        <div
            className="bg-white w-full h-screen p-6"
            onKeyDown={(e) => handleEnter(e, () => handleSubmit())}
        >

            {/* Back button */}
            <FaArrowLeft onClick={goBack} className="text-xl cursor-pointer" />

            <div className="flex flex-col items-center w-full mt-6">

                {/* Header */}
                <h1 className="text-4xl font-extrabold text-center">Welcome Back!</h1>

                {/* Hero */}
                <img
                    src={MusicImage}
                    alt="music image"
                    className="w-full"
                />

                {/* Login form */}
                <div className="flex flex-col gap-8 w-full px-8">

                    {/* Server errors */}
                    {errors.general && (
                        <p className="text-red-500 text-sm">{errors.general}</p>
                    )}

                    {/* email input */}
                    <Input
                        autoFocus
                        StartAdornment={MdOutlineEmail}
                        className="w-full"
                        placeholder="Email"
                        onChange={(e) => setPayload({ ...payload, email: e.target.value })}
                        value={payload.email}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}

                    {/* password input */}
                    <Input
                        StartAdornment={MdLockOutline}
                        EndAdornment={showPassword ? IoEye : IoEyeOff}
                        EndAdornmentOnClick={() => setShowPassword(!showPassword)}
                        className="w-full"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPayload({ ...payload, password: e.target.value })}
                        value={payload.password}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password}</p>
                    )}

                    {/* login button */}
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                            <button
                                className="w-full bg-blue-600 text-white rounded-full py-2 font-bold mt-10"
                                onClick={handleSubmit}
                            >
                                Login
                            </button>
                    )}
                </div>
                <p className="text-center mt-6 text-sm">Don't have an account? <Link to="/register" className="text-blue-600 cursor-pointer">Sign Up</Link></p>
            </div>
        </div>
    );
}

export default Login;

import { useState, useRef } from "react";
import { handleEnter } from "@/utils/keyDown";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import MusicImage from "@/assets/Music.svg";
import Input from "@/components/Input";
import { MdLockOutline } from "react-icons/md";
import { confirmPasswordSchema, passwordSchema } from "@/schemas/validationSchema";
import { IoEyeOff, IoEye } from "react-icons/io5";

interface PasswordRegisterProps {
    payload: any;
    setPayload: any;
    setCurrentPage: any;
}

const PasswordRegister: React.FC<PasswordRegisterProps> = ({ payload, setPayload, setCurrentPage }) => {

    // adds verified email to the payload
    const handleSubmit = () => {
        setCurrentPage(2);
    }

    // show password state
    const [showPassword, setShowPassword] = useState(false);

    // show confirm password state
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const passwordTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const cPasswordTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // button disabled state
    const [buttonDisabled, setButtonDisabled] = useState(true);

    // error state
    const [errors, setErrors] = useState({
        password: '',
        confirm_password: '',
    });

    const [passwordInputs, setPasswordInputs] = useState({
        password: '',
        confirm_password: '',
    });

    const passwordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentPassword = e.target.value;
        setPasswordInputs({ ...passwordInputs, password: currentPassword });
        setErrors({ ...errors, password: '' });
        setButtonDisabled(true);
        if (passwordTimeoutRef.current) {
            clearTimeout(passwordTimeoutRef.current);
        }

        passwordTimeoutRef.current = setTimeout(() => {
            if (currentPassword.length > 0) {
                validatePassword(currentPassword);
            }
        }, 500);
    }

    const validatePassword = async (password: string) => {
        try {
            await passwordSchema.validate(password, { abortEarly: false })
        } catch (err) {
            setErrors({ ...errors, password: err.errors[0] });
        }
    }

    const cPasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentPassword = e.target.value;
        const { password } = passwordInputs;
        setPasswordInputs({ ...passwordInputs, confirm_password: currentPassword });
        setErrors({ ...errors, confirm_password: '' });
        setButtonDisabled(true);
        if (cPasswordTimeoutRef.current) {
            clearTimeout(cPasswordTimeoutRef.current);
        }

        cPasswordTimeoutRef.current = setTimeout(() => {
            if (passwordInputs.confirm_password.length > 0) {
                validateConfirmPassword(password, currentPassword);
            }
        }, 500);
    }

    const validateConfirmPassword = async (password: string, confirmPassword: string) => {

        try {
            // Validate password format using Yup schema
            await confirmPasswordSchema.validate({ password: password, confirm_password: confirmPassword }, { abortEarly: false });

            // Success State
            setButtonDisabled(false);
            setErrors({ ...errors, confirm_password: '' });
            setPayload({ ...payload, password: password, confirm_password: confirmPassword });
        } catch (err) {

            setErrors({ ...errors, confirm_password: err.errors[0] });

            // Error State
            setButtonDisabled(true);
        }
    }

    // button classes
    const disabledButtonClasses = "bg-gray-400 cursor-not-allowed text-gray-200";
    const enabledButtonClasses = "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer";

    return (
        <div
            className="bg-white w-full h-screen p-6"
            onKeyDown={(e) => handleEnter(e, () => buttonDisabled ? undefined : setCurrentPage(3))}
        >
            {/* Back button */}
            <FaArrowLeft
                onClick={() => setCurrentPage(1)}
                className="text-xl cursor-pointer"
            />

            <div className="flex flex-col items-center w-full mt-6">

                {/* Header */}
                <h1 className="text-4xl font-extrabold text-center">Create a password!</h1>

                {/* Hero */}
                <img
                    src={MusicImage}
                    alt="music image"
                    className="w-full"
                />

                {/* Password form */}
                <div className="flex flex-col gap-8 w-full px-8">

                    {/* password input */}
                    <label htmlFor="password">Password</label>
                    <Input
                        id="password"
                        autoFocus
                        StartAdornment={MdLockOutline}
                        EndAdornment={showPassword ? IoEye : IoEyeOff}
                        EndAdornmentOnClick={() => setShowPassword(!showPassword)}
                        className="w-full"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        onChange={(e) => passwordInputChange(e)}
                        value={passwordInputs.password}
                    />
                    {errors && (
                        <p className="text-red-500 text-sm">{errors.password}</p>
                    )}

                    {/* confirm password input */}
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <Input
                        id="confirm-password"
                        autoFocus
                        StartAdornment={MdLockOutline}
                        EndAdornment={showConfirmPassword ? IoEye : IoEyeOff}
                        EndAdornmentOnClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        type={showConfirmPassword ? "text" : "password"}
                        className="w-full"
                        placeholder="Confirm Password"
                        onChange={(e) => cPasswordInputChange(e)}
                        value={passwordInputs.confirm_password}
                    />
                    {errors && (
                        <p className="text-red-500 text-sm">{errors.confirm_password}</p>
                    )}

                    <button
                        className={"w-full rounded-full py-2 font-bold mt-10 " + (buttonDisabled ? disabledButtonClasses : enabledButtonClasses)}
                        onClick={() => setCurrentPage(3)}
                        disabled={buttonDisabled}
                    >
                        Continue
                    </button>

                </div>
                <p className="text-center mt-6 text-sm">Already have an account? <Link to="/login" className="text-blue-600 cursor-pointer">Login</Link></p>
            </div>
        </div>
    );
}

export default PasswordRegister;

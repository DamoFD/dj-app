import { useState, useRef } from "react";
import { handleEnter } from "@/utils/keyDown";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import MusicImage from "@/assets/Music.svg";
import Input from "@/components/Input";
import { MdOutlineEmail } from "react-icons/md";
import { emailSchema } from "@/schemas/validationSchema";
import { ImSpinner2 } from "react-icons/im";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IconType } from "react-icons";

/**
* TODO: Pressing enter bypasses disabled button
*/

interface EmailRegisterProps {
    payload: any;
    setPayload: any;
    setCurrentPage: any;
}

const EmailRegister: React.FC<EmailRegisterProps> = ({ payload, setPayload, setCurrentPage }) => {

    // adds verified email to the payload
    const handleSubmit = () => {
        console.log("submitted");
    }

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // loading state
    const [loading, setLoading] = useState(false);

    // button disabled state
    const [buttonDisabled, setButtonDisabled] = useState(true);

    // error state
    const [errors, setErrors] = useState([]);

    const [endAdornment, setEndAdornment] = useState<IconType | undefined>(undefined);

    // react router dom navigation
    const navigate = useNavigate();

    // goes back to the previous page
    const goBack = () => {
        navigate(-1);
    }

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setPayload({ ...payload, email: email });
        if (email.length <= 0) {
            setEndAdornment(() => undefined);
        } else {
            setEndAdornment(() => ImSpinner2);
        }
        setErrors([]);
        setButtonDisabled(true);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            if (email.length > 0) {
                validateEmail(email);
            }
        }, 2000);
    }

    const validateEmail = async (email: string) => {
        console.log("validating email");

        try {
            await emailSchema.validate(email, { abortEarly: false });
            setEndAdornment(() => FaCheckCircle);
            setButtonDisabled(false);
        } catch (err) {
            setErrors(err.errors);
            setEndAdornment(() => MdCancel);
        }
    }

    // button classes
    const disabledButtonClasses = "bg-gray-400 cursor-not-allowed text-gray-200";
    const enabledButtonClasses = "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer";

    return (
        <div
            className="bg-white w-full h-screen p-6"
            onKeyDown={(e) => handleEnter(e, () => handleSubmit())}
        >
            {/* Back button */}
            <FaArrowLeft
                onClick={goBack}
                className="text-xl cursor-pointer"
            />

            <div className="flex flex-col items-center w-full mt-6">

                {/* Header */}
                <h1 className="text-4xl font-extrabold text-center">Enter your email!</h1>

                {/* Hero */}
                <img
                    src={MusicImage}
                    alt="music image"
                    className="w-full"
                />

                {/* Email form */}
                <div className="flex flex-col gap-8 w-full px-8">

                    {/* email input */}
                    <Input
                        autoFocus
                        StartAdornment={MdOutlineEmail}
                        EndAdornment={endAdornment}
                        className="w-full"
                        placeholder="Email"
                        onChange={(e) => inputChange(e)}
                        value={payload.email}
                    />
                    {errors && (
                        <p className="text-red-500 text-sm">{errors[0]}</p>
                    )}

                    <button
                        className={"w-full rounded-full py-2 font-bold mt-10 " + (buttonDisabled ? disabledButtonClasses : enabledButtonClasses)}
                        onClick={handleSubmit}
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

export default EmailRegister;

import { useState } from "react";
import { useRegisterService } from "@/hooks/registerService";
import EmailRegister from "@/components/EmailRegister";
import PasswordRegister from "@/components/PasswordRegister";
import NameRegister from "@/components/NameRegister";
import RegisterConfirmation from "@/components/RegisterConfirmation";

const Register: React.FC = () => {
    const { register, errors, loading } = useRegisterService();

    const [payload, setPayload] = useState({
        artist_name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="bg-white w-full h-screen">
            {currentPage === 1 && <EmailRegister payload={payload} setPayload={setPayload} setCurrentPage={setCurrentPage} />}
            {currentPage === 2 && <PasswordRegister payload={payload} setPayload={setPayload} setCurrentPage={setCurrentPage} />}
            {currentPage === 3 && <NameRegister payload={payload} setPayload={setPayload} setCurrentPage={setCurrentPage} />}
            {currentPage === 4 && <RegisterConfirmation payload={payload} setCurrentPage={setCurrentPage} />}
        </div>
    );
}

export default Register;

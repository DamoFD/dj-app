import { useState } from "react";
import { useRegisterService } from "@/hooks/registerService";
import EmailRegister from "@/components/EmailRegister";

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
        </div>
    );
}

export default Register;

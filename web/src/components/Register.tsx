import { useState } from "react";
import { useRegisterService } from "@/hooks/registerService";

const Register: React.FC = () => {
    const { register, errors, loading } = useRegisterService();

    const [payload, setPayload] = useState({
        artist_name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    return (
        <div>
            <h1>Register</h1>
        </div>
    );
}

export default Register;

import { loginSchema } from "@/schemas/validationSchema";
import { useAuth } from "@/context/AuthContext";
import axiosClient from "@/axios-client";
import * as yup from 'yup';
import axios from "axios";
import { useState } from "react";

// Payload for the login form
interface Payload {
    email: string;
    password: string;
}

// Errors for the login form
interface Errors {
    email?: string;
    password?: string;
    general?: string;
}

/**
* Login service hook
*
* Logic for logging in the user.
* This hook provides:
* - loading state
* - error state
* - login function
*
* @returns { loading: boolean, errors: Errors, login: (payload: Payload) => Promise<void> }
*
* @since 0.0.1
*/
export const useLoginService = () => {

    // updated the user state
    const { fetchUser } = useAuth();

    // loading state
    const [ loading, setLoading ] = useState(false);

    // errors state
    const [errors, setErrors] = useState<Errors>({
        email: '',
        password: '',
        general: '',
    });

    /**
    * Attempts to login the user
    *
    * @param Payload - the login form data
    *
    * @returns void
    *
    * @since 0.0.1
    */
    const login = async (payload: Payload) => {
        try {
            // set loading state
            setLoading(true);
            // validate the inputs
            await loginSchema.validate(payload, { abortEarly: false });
            // post request to server
            const response = await axiosClient.post('/login', {
                email: payload.email,
                password: payload.password,
            });
            // pull token from the response
            const token = response.data.token;
            // Save the token to local storage
            localStorage.setItem('auth_token', token);
            // update user state
            await fetchUser();
        } catch (error) {
            // empty error state
            const newErrors: Errors = {};
            // loop through validation errors
            if (error instanceof yup.ValidationError) {
                error.inner.forEach((err) => {
                    // set validation error state
                    newErrors[err.path as keyof Errors] = err.message;
                });
                // set server error state
            } else if (axios.isAxiosError(error)) {
                // check for 429 rate limit server error
                if (error.response?.status === 429) {
                    newErrors.general = 'Too many requests. Please try again later.';
                    // check for any other server errors (ex: invalid credentials)
                } else {
                    newErrors.general = error.response?.data.message;
                }
                // catach all for any other errors
            } else {
                newErrors.general = 'An unexpected error occurred. Please try again later.';
                return errors;
            }
            // set the error state
            setErrors(newErrors);
            throw newErrors;
        } finally {
            // reset loading state
            setLoading(false);
        }
    };

    return { login, errors, loading };
};

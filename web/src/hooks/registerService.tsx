import { registerSchema } from "@/schemas/validationSchema";
import { useAuth } from "@/context/AuthContext";
import axiosClient from "@/axios-client";
import * as yup from 'yup';
import axios from "axios";
import { useState } from "react";

// Payload for the register form
interface Payload {
    artist_name: string;
    email: string;
    password: string;
    confirm_password: string;
}

// Errors for the register form
interface Errors {
    artist_name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
    general?: string;
}

/**
* Register service hook
*
* Logic for register a new user.
* This hook provides:
* - loading state
* - error state
* - register function
* - checkEmail function
* - checkPassword function
* - checkArtistName function
*
* @returns {
*   loading: boolean,
*   errors: Errors,
*   login: (payload: Payload) => Promise<void>
*   checkEmail: (email: string) => Promise<void>
*   checkPassword: (password: string) => Promise<void>
*   checkArtistName: (artist_name: string) => Promise<void>
* }
*
* @since 0.0.1
*/
export const useRegisterService = () => {

    // updated the user state
    const { fetchUser } = useAuth();

    // loading state
    const [ loading, setLoading ] = useState(false);

    // errors state
    const [errors, setErrors] = useState<Errors>({
        artist_name: '',
        email: '',
        password: '',
        confirm_password: '',
        general: '',
    });

    /**
    * Attempts to register the user
    *
    * @param Payload - the register form data
    *
    * @returns void
    *
    * @since 0.0.1
    */
    const register = async (payload: Payload) => {
        try {
            // set loading state
            setLoading(true);

            if (!payload.artist_name) {
                payload.artist_name = payload.email.split('@')[0];
            }
            // validate the inputs
            await registerSchema.validate(payload, { abortEarly: false });
            // post request to server
            const response = await axiosClient.post('/register', {
                artist_name: payload.artist_name,
                email: payload.email,
                password: payload.password,
                confirm_password: payload.confirm_password
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

    return { register, errors, loading };
};

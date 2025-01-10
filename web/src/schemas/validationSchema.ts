import * as yup from 'yup';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailSchema = yup.string().required('Email is required').matches(emailRegex, 'Email is invalid').max(255, 'Email must be less than 255 characters');
export const passwordSchema = yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').max(255, 'Password must be less than 255 characters');
const passwordConfirmationVerification = yup.string().required('Confirm password field is required').oneOf([yup.ref('password'), null], 'Passwords must match');
export const artistNameSchema = yup.string().required('Artist name is required').max(255, 'Artist name must be less than 255 characters');

// Login payload verification schema
export const loginSchema = yup.object().shape({
    email: emailSchema,
    password: passwordSchema
});

// Register payload verification schema
export const registerSchema = yup.object().shape({
    artist_name: artistNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirm_password: passwordConfirmationVerification
});

// Password payload verification schema
export const confirmPasswordSchema = yup.object().shape({
    password: passwordSchema,
    confirm_password: passwordConfirmationVerification
});

import * as yup from 'yup';

const emailVerification = yup.string().required('Email is required').email('Email is invalid').max(255, 'Email must be less than 255 characters');
const passwordVerification = yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').max(255, 'Password must be less than 255 characters');
const passwordConfirmationVerification = yup.string().required('Confirm password field is required').oneOf([yup.ref('password'), null], 'Passwords must match');
const artistNameVerification = yup.string().required('Artist name is required').max(255, 'Artist name must be less than 255 characters');

// Login payload verification schema
export const loginSchema = yup.object().shape({
    email: emailVerification,
    password: passwordVerification
});

// Register payload verification schema
export const registerSchema = yup.object().shape({
    artist_name: artistNameVerification,
    email: emailVerification,
    password: passwordVerification,
    confirm_password: passwordConfirmationVerification
});

// Email payload verification schema
export const emailSchema = yup.object().shape({
    email: emailVerification,
});

// Password payload verification schema
export const passwordSchema = yup.object().shape({
    password: passwordVerification,
    confirm_password: passwordConfirmationVerification
});

// Artist name payload verifiaction schema
export const artistNameSchema = yup.object().shape({
    artist_name: artistNameVerification
});

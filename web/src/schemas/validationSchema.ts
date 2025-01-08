import * as yup from 'yup';

// Login payload verification schema
export const loginSchema = yup.object().shape({
    email: yup.string().required('Email is required').email('Email is invalid').max(255, 'Email must be less than 255 characters'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').max(255, 'Password must be less than 255 characters'),
});

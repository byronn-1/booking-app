import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    phone_number: Yup.string()
        .matches(/^\d{1,12}$/),
    club_name: Yup.string()
        .required('Club name is required'),
    club_type: Yup.string()
        .required('Club type is required'),
    street_number: Yup.string()
        .required('Street number is required'),
    street_name: Yup.string()
        .required('Street name is required'),
    address_line2: Yup.string(),
    city: Yup.string()
        .required('City is required'),
    state: Yup.string()
        .required('State/Region/County is required'),
    postal_code: Yup.string()
        .required('Postal code is required'),
    country: Yup.string()
        .required('Country is required'),
    isclub_private: Yup.string()
        .required('Please specify if the club is invitation only'),
    club_url: Yup.string()
        .matches(
            /^(https?:\/\/)?(www\.)?[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/,
            'Invalid URL'
        )
});

export const studentValidationSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    phone_number: Yup.string()
        .matches(/^\d{1,12}$/),
    club_name: Yup.string()
        .required('Club name is required'),
    club_type: Yup.string()
        .required('Club type is required'),
    street_number: Yup.string()
        .required('Street number is required'),
    street_name: Yup.string()
        .required('Street name is required'),
    address_line2: Yup.string(),
    city: Yup.string()
        .required('City is required'),
    state: Yup.string()
        .required('State/Region/County is required'),
    postal_code: Yup.string()
        .required('Postal code is required'),
    country: Yup.string()
        .required('Country is required'),
    isclub_private: Yup.string()
        .required('Please specify if the club is invitation only'),
    club_url: Yup.string()
        .matches(
            /^(https?:\/\/)?(www\.)?[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/,
            'Invalid URL'
        )
});

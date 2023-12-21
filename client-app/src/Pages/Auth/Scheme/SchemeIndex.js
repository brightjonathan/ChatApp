import * as yup from 'yup';

//Regex expression
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

//created a schema fro the yup validation
export const basicSchema = yup.object().shape({
   username: yup.string().min(6, 'Name too short').required('This field is reqiured'),
   email: yup.string().email('Please enter a valid email').required('This field is reqiured'),
   password: yup.string().min(6).matches(passwordRules, {message: 'Please create a stronger password'}).required('This field is reqiured'),
   confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required('This field is required'),
});

import * as yup from 'yup'

const requiredMsg = 'This field is required'

export const signupSchema = yup.object().shape({
  email: yup.string().required(requiredMsg).email('Invalid email address'),
  password: yup
    .string()
    .required(requiredMsg)
    .min(8, 'Should be 8 to 16 characters')
    .max(16, 'Password should less than 16 characters'),
  username: yup.string().required(requiredMsg).matches(/^\S*$/, 'Username should not contain space')
})

export const signinSchema = yup.object().shape({
  email: yup.string().required(requiredMsg).email('Invalid email address'),
  password: yup.string().required(requiredMsg)
})

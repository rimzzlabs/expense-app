import * as yup from 'yup'

const requiredMsg = 'This field is required'

const int4MaxValue = 2_000_000_000

export const signupSchema = yup.object().shape({
  email: yup.string().required(requiredMsg).email('Invalid email address'),
  password: yup
    .string()
    .required(requiredMsg)
    .min(8, 'Should be 8 to 32 characters')
    .max(32, 'Password should less than 32 characters'),
  username: yup.string().required(requiredMsg).matches(/^\S*$/, 'Username should not contain space')
})

export const signinSchema = yup.object().shape({
  email: yup.string().required(requiredMsg).email('Invalid email address'),
  password: yup.string().required(requiredMsg)
})

export const createExpenseSchema = yup.object().shape({
  title: yup
    .string()
    .required(requiredMsg)
    .min(4, 'At least 4 characters')
    .max(32, 'Should less than 32 characters'),
  total_money: yup
    .number()
    .typeError('Amount should not empty')
    .negative('Should not a negative number')
    .min(1, 'At least 1 dollar')
    .required(requiredMsg)
    .lessThan(int4MaxValue, 'Should less than 2 billions')
})

export const createHistorySchema = yup.object().shape({
  source: yup
    .string()
    .required(requiredMsg)
    .min(4, 'At least 6 characters')
    .max(24, 'Should less than 24 characters'),
  type: yup.string().not(['Select'], 'Is it income or outcome?').required(requiredMsg),
  amount: yup
    .number()
    .typeError('Amount should not empty')
    .negative('Should not a negative number')
    .min(1, 'At least 1 dollar')
    .required(requiredMsg)
    .lessThan(int4MaxValue, 'Should less than 2 billions')
})

export const editExpenseSchema = (title: string) =>
  yup.object().shape({
    title: yup
      .string()
      .required('Field is required')
      .min(4, 'At least 4 characters')
      .max(24, 'Should less than 24 characters')
      .not([title], 'Title were same as before')
  })

export const editHistorySchema = (source: string) =>
  yup.object().shape({
    source: yup
      .string()
      .required('Field is required')
      .min(4, 'At least 6 characters')
      .max(24, 'Should less than 24 characters')
      .not([source], 'Source were same as before')
  })

export const editUsernameSchema = (username: string) =>
  yup.object().shape({
    username: yup
      .string()
      .required(requiredMsg)
      .matches(/^\S*$/, 'Username should not contain space')
      .max(30, 'Should less than 30 characters')
      .not([username], 'username were same as before')
  })

export const editEmailSchema = (email: string) =>
  yup.object().shape({
    email: yup
      .string()
      .required(requiredMsg)
      .email('Invalid email address')
      .not([email], 'email were same as before')
  })

export const editPasswordSchema = yup.object().shape({
  password: signupSchema.fields.password
})

export const forgotPasswordSchema = yup.object().shape({
  email: signupSchema.fields.email
})

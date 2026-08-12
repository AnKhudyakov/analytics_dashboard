import i18n from 'i18next';
import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: () => i18n.t('validation.required'),
    oneOf: () => i18n.t('validation.match'),
  },
  string: {
    min: ({ min }) => i18n.t('validation.min', { min }),
    email: () => i18n.t('validation.invalidEmail'),
  },
});

export const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required().min(6),
  remember: yup.boolean().required(),
});

export const signupSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password')]),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;
export type SignupFormValues = yup.InferType<typeof signupSchema>;

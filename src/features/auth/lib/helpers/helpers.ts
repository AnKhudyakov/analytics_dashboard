import i18n from 'app/providers/i18n';
import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: () => i18n.t('validation.required'),
    oneOf: () => i18n.t('validation.match'),
  },
  string: {
    min: ({ min }) => i18n.t('validation.min', { min }),
    email: () => i18n.t('validation.invalidEmail'),
  },
});

export const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required().min(6),
  remember: Yup.boolean().required(),
});

export const validationSignupSchema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(6),
  passwordConfirmation: Yup.string().required().oneOf(
    [Yup.ref('password')]
  ),
});

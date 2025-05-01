import { getEmailRegex, getNameRegex } from '@/lib/utils';
import * as yup from 'yup';
import { isValidPhoneNumber, isPossiblePhoneNumber, type CountryCode } from 'libphonenumber-js';


export const nameValidation = yup
  .string()
  .min(2, 'Мінімум 2 символи')
  .max(30, 'Максимум 30 символів')
  .matches(getNameRegex(null), 'Ім\'я невірне')
  .required('Ім\'я обов\'язкове');

export const phoneValidation = (country: string) =>
  yup
    .string()
    .test('phone', 'Номер телефону невірний!', async (str) => {
      const isValidPhone =
        (await isValidPhoneNumber(
          str || '',
          country.toUpperCase() as CountryCode,
        )) &&
        (await isPossiblePhoneNumber(
          str || '',
          country.toUpperCase() as CountryCode,
        ));

      return isValidPhone;
    })
    .required('Номер телефону обов\'язковий');

export const emailValidation = yup
  .string()
  .email('Email невірний!')
  .matches(getEmailRegex(), 'Email невірний!')
  .required('Email обов\'язковий');

export const defaultInputValidation = yup
  .string()
  .min(2, 'Мінімум 2 символи')
  .max(30, 'Максимум 30 символів')
  .required('Обов\'язкове поле');

export const defaultInputValidationNotRequired = yup.string();

export const checkboxValidation = yup
  .boolean()
  .oneOf([true], 'Обов\'язкове поле')
  .required('Обов\'язкове поле');

export const selectValidation = yup
  .string()
  .min(1, 'Обов\'язкове поле')
  .required('Обов\'язкове поле');

export const radioValidation = yup
  .string()
  .required('Будь ласка, оберіть один із варіантів');
import { Controller, Control, FieldErrors, FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';
import 'react-phone-input-2/lib/style.css';
import React from 'react';
import PhoneInput, { CountryData } from 'react-phone-input-2';

type Props = {
  control: Control<FieldValues>;
  setCountry: (country: string) => void;
  country: string;
  name: string;
  error: FieldErrors<FieldValues>;
  label?: string | null | React.ReactNode;
  classNameInputLabel?: string;
  classNameInputError?: string;
  classNameInput?: string;
};

function IntlTelInput({
  control,
  setCountry,
  country,
  name,
  error,
  label,
  classNameInputError,
  classNameInput,
  classNameInputLabel,
}: Props) {
  console.log(country);
  return (
    <Controller
      name={name}
      control={control}
      rules={{ 
        required: true,
        validate: {
          isValid: (value) => {
            if (!value) return true; // Не показувати помилку при пустому значенні
            return true;
          }
        }
      }}
      render={({ field }) => {
        const { onChange, value } = field;

        return (
          <label className="input-phone">
            {label && (
              <span
                className={cn(
                  'input-label-title',
                  { 'is-invalid': error[name]?.message },
                  classNameInputLabel,
                )}
              >
                {label}
              </span>
            )}
            <span className="input-wrapper">
              <PhoneInput
                country={country.toLowerCase()}
                value={value}
                onChange={(phone, country: CountryData) => {
                  onChange(phone);
                  setCountry(country.countryCode);
                }}
                inputClass={cn(
                  'input-field',
                  { 'is-invalid': error[name]?.message },
                  classNameInput,
                )}
                excludeCountries={['ru']}
                preferredCountries={['ua', 'pl', 'tr']}
              />
            </span>

            {error[name] && (
              <p className={cn('just-validate-error-label', classNameInputError)}>
                {(error[name] as { message: string })?.message}
              </p>
            )}
          </label>
        );
      }}
    />
  );
}

export default IntlTelInput;

import React from 'react';
import Checkbox from "./checkbox";
import SelectInput from "./selectInput";
import type { FormInput } from "@/types/types";
import { cn } from "@/lib/utils";
import IntlTelInput from "./intlTelInput";



function Input({
  name,
  type,
  placeholder,
  dataField,
  options,
  title,
  required,
  links,
  linkSeparator,
  radio,
  register,
  error,
  setValue,
  country,
  setCountry,
  control,
}: FormInput) {




  const renderInputs = () => {
    switch (type) {
      case "tel":
        return (
          <IntlTelInput control={control} error={error} setCountry={setCountry} name="phone" country={country} />
        );
      case "select":
        return (
          <SelectInput
            setValue={setValue}
            name={name}
            title={title}
            placeholder={placeholder}
            dataField={dataField}
            options={options}
            required={required}
            error={error}
            register={register}
          />
        );
      case "checkbox":
        return (
          <Checkbox
            name={name}
            title={title}
            dataField={dataField}
            required={required}
            links={links}
            linkSeparator={linkSeparator}
            error={error}
            register={register}
            setValue={setValue}
          />
        );
      case "radio":
        return (
          <>
            {Array.isArray(radio)
              ? radio.map((arg) => (
                  <label key={arg.value} className="input-label-radio">
                    <input
                      className="visually-hidden"
                      type="radio"
                      id={`user_input_${arg.value}`}
                      value={arg.value}
                      data-field={dataField}
                      required={required}
                      {...register(name || "user", {
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          setValue(name || "user", e.target.value);
                        },
                      })}
                    />
                    <span
                      className={cn(
                        "radio",
                        error[name] ? "is-invalid" : "",
                      )}
                    ></span>
                    {arg.text ? (
                      <span className="radio-text">{arg.text}</span>
                    ) : (
                      ""
                    )}
                    {arg.title ? (
                      <span className="radio-title">{arg.title}</span>
                    ) : (
                      ""
                    )}
                  </label>
                ))
              : ""}
           <p className="just-validate-error-label">{(error[name] as { message: string })?.message}</p>
          </>
        );
      case "textarea":
        return (
          <>
            <label className="input-label" htmlFor={name}>
              {title || ""}
            </label>
            <textarea
              className="input-field input-message"
              id={name}
              placeholder={placeholder}
              data-field={dataField}
              required={required}
              {...register(name, {
                onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setValue(name, e.target.value);
                },
              })}
            ></textarea>
          </>
        );
      default:
        return (
          <>
            <label className="input-label" htmlFor={`${name}_input_${name}`}>
              {title || ""}
            </label>
            <input
              className={cn("input-field", error[name] ? "is-invalid" : "")}
              type="text"
              id={`${name}_input_${name}`}
              placeholder={placeholder}
              data-field={dataField}
              required={required}
              {...register(name, {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue(name, e.target.value);
                },
              })}
            />
            <p className="just-validate-error-label">{(error[name] as { message: string })?.message}</p>
          </>
        );
    }
  };

  return (
    <div
      className={cn(
        "input-wrap",
        type === "radio" ? "input-wrap-radio" : "",
        type === "checkbox" ? "input-wrap-checkbox" : "",
      )}
    >
      {renderInputs()}
    </div>
  );
}

export default Input;
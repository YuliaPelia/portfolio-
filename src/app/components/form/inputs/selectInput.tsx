import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { UseFormRegister, UseFormSetValue, FieldErrors, FieldValues } from "react-hook-form";

interface FormOption {
  value: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
}

interface SelectInputProps {
  name: string;
  title?: string;
  placeholder?: string;
  dataField: string;
  options?: FormOption[];
  required?: boolean;
  error: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  title,
  placeholder = "Select an option",
  dataField,
  options = [],
  required = false,
  error,
  register,
  setValue,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const defaultValue = options.find((opt) => opt.selected)?.value || "";
    setSelectedValue(defaultValue);
    setValue(name, defaultValue, { shouldValidate: false });
  }, [setValue, name, options]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setValue(name, value, { shouldValidate: true });
    console.log(name, value);

    setIsOpen(false);
  };

  return (
    <div className={cn("custom-select-wrapper", isOpen ? "open" : "")}>
      {title && <div className="custom-select-label input-label">{title}</div>}
      <div className="relative" onClick={() => setIsOpen(!isOpen)}>
        <div
          className={cn(
            "custom-select-trigger input-field",
            error[name] ? "is-invalid" : "",
          )}
        >
          {selectedValue
            ? options.find((opt) => opt.value === selectedValue)?.label
            : placeholder}
        </div>
        <img
          className="select-arrow"
          src="./images/icons/select-arrow.svg"
          alt="стрілка"
        />
      </div>
      {isOpen && (
        <div
          className={cn(
            "custom-options-wrapper",
            error[name] ? "is-invalid" : "",
          )}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`custom-option ${option.disabled ? "disabled" : ""}`}
              onClick={() => !option.disabled && handleSelect(option.value)}
            >
              <span className="option-label">{option.label}</span>
            </div>
          ))}
        </div>
      )}
      <select
        className="select-field hidden"
        data-field={dataField}
        required={required}
        {...register(name)}
        value={selectedValue}
        onChange={(e) =>
          setValue(name, e.target.value, { shouldValidate: true })
        }
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      <p className="just-validate-error-label">
        {(error[name] as { message: string })?.message}
      </p>
    </div>
  );
};
export default SelectInput;

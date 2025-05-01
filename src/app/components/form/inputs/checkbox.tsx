import { cn } from "@/lib/utils";
import { UseFormRegister, UseFormSetValue, FieldErrors, FieldValues } from 'react-hook-form';

interface FormLink {
  text: string;
  href: string;
}

interface FormInputProps {
  name: string;
  title?: string;
  dataField: string;
  required: boolean;
  links?: FormLink[];
  linkSeparator?: string;
  error: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

export default function Checkbox({
  name,
  title,
  dataField,
  required,
  links,
  linkSeparator,
  error,
  register,
  setValue,
}: FormInputProps) {
  return (
    <>
      <label className="input-label-checkbox">
        <input
          className={cn("visually-hidden", error[name] ? "is-invalid" : "")}
          type="checkbox"
          id={`checkbox_input_${name}`}
          name={name}
          // value="agree"
          data-field={dataField}
          required={required}
          {...register(name, {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setValue(name, e.target.checked);
              console.log(name, e.target.checked);
            },
          })}
        />
        <span className="checkbox"></span>
        <span>
          {title}
          {Array.isArray(links) &&
            links.map((arg, index) => {
              return (
                <div className="inline" key={index}>
                  <a
                    className="text-accent"
                    href={arg.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    {" "}
                    {arg.text}{" "}
                  </a>
                  {index < links.length - 1 && linkSeparator}
                </div>
              );
            })}
        </span>
      </label>
      <p className="just-validate-error-label">{error[name]?.message}</p>
    </>
  );
}

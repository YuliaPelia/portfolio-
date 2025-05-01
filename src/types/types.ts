import { Control, FieldErrors, FieldValues, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
export type Props = {
    params: Promise<{ locale: string }>

}
export type Locale = 'en' | 'ua';

export interface ItemData {
    img: string;
    price: string;
    link: {
        title: string;
        link: string;
    };
}


interface FormRadio {
    value: string;
    text?: string;
    title?: string;
    name: string;
    
  }
  
  interface FormLink {
    text: string;
    href: string;
  }
  interface FormOption {
    value: string;
    label: string;
    disabled?: boolean;
    selected?: boolean;
  }

export interface FormFieldConfig {
    title: string;
    type: "text" | "tel" | "email" | "checkbox" | "radio" | "select" | "textarea";
    name: string;
    placeholder?: string;
    radio?: FormRadio[];
    dataField: string;
    required: boolean;
    autocomplete?: string;
    class?: string;
    linkSeparator?: string;
    links?: FormLink[];
    options?: FormOption[];
}

export interface FormFields {
    inputs: FormFieldConfig[];
    btnSubmit: string;
}

export interface FormInput extends FormFieldConfig {
    register: UseFormRegister<FieldValues>;
    error: FieldErrors<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    country: string;
    setCountry: (country: string) => void;
    control: Control<FieldValues>;
}
  
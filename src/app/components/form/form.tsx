declare global {
    interface Window {
        dataLayer?: unknown[];
    }
}

import { useForm, FieldErrors, Resolver, Control, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import useFormSubmit from "@/hooks/useFormSubmit";

import Input from "./inputs/input";
import type { FormFieldConfig } from "@/types/types";
import { cn } from "@/lib/utils";
import {
    nameValidation,
    phoneValidation,
    emailValidation,
    checkboxValidation,
    selectValidation,
    radioValidation,
    defaultInputValidation,
    defaultInputValidationNotRequired,
} from "@/lib/validations";
import { getParamsForRedirectUrl } from "@/lib/form-utils";
import { useUserInfoStore } from "@/lib/useUserInfoStore";

interface FormFields {
    inputs: FormFieldConfig[];
    btnSubmit: string;
}

interface CrmParams {
    isModal: boolean;
    productName: string;
    productId: string;
    esputnikFormType: string;
    esputnikGroupsName: string;
    redirectUrl: string;

}

interface FormData {
    name?: string;
    phone?: string;
    email?: string;
    agree?: boolean;
    lesson?: string;
    user?: string;
    [key: string]: string | boolean | undefined;
}

interface FormConfigProps {
    formFields: FormFields;
    crmParams: CrmParams;
    afterSendFunction?: (data: FormData) => Promise<void>;
}
// TODO: додати ip
// Коли викликаємо форму то створюємо для неї окремий компонент в якому передаємо всі необхідні пропси, тому що якщо викликати цю форму в кожному копоненті окремо і передавати туди дані, тоді форма буде декілька разів рендеритися і це не потрібно, якщо всі дані будуть однакові

export default function Form({
    formFields,
    crmParams,
    afterSendFunction = async (data: FormData) => { console.log(data)},
}: FormConfigProps) {
    const [submitedSuccess, setSubmitedSuccess] = useState(false);
    const { userInfo } = useUserInfoStore();
    console.log(userInfo);
    const [country, setCountry] = useState(userInfo.country_code);



    const createValidationSchema = () => {
        const validationRules = {} as Record<keyof FormData, yup.Schema>;

        formFields.inputs.forEach((input) => {
            switch (input.name) {
                case 'name':
                    if (input.required) {
                        validationRules.name = nameValidation;
                    }
                    break;
                case 'phone':
                    if (input.required) {

                        validationRules.phone = phoneValidation(country);
                    }
                    break;
                case 'email':
                    if (input.required) {
                        validationRules.email = emailValidation;
                    }
                    break;
                case 'agree':
                    if (input.required) {
                        validationRules.agree = checkboxValidation;
                    }
                    break;
                case 'lesson':
                    if (input.required) {
                        validationRules.lesson = selectValidation;
                    }
                    break;
                case 'user':
                    if (input.required) {
                        validationRules.user = radioValidation;
                    }
                    break;
                default:
                    validationRules[input.name] = input.required
                        ? defaultInputValidation
                        : defaultInputValidationNotRequired;
            }
        });

        return yup.object(validationRules);
    };

    const formSchema = createValidationSchema();

    const form = useForm<FormData>({
        mode: "onTouched",
        resolver: yupResolver(formSchema) as Resolver<FormData>,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
        getValues,
    } = form;

    const {
        isLoading,
        setIsLoading,
        isClient,
        handleError,
        formSuccessHandler,
        trackFormSubmission,
        ensureUtmParams,
        getCommonRequestData,
    } = useFormSubmit({ form, isModal: crmParams.isModal });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        // console.log("Form submitted with data:", data);

        try {
            const params = {
                ...getCommonRequestData(),
                product_name: crmParams.productName,
                product_id: crmParams.productId,
                Course: crmParams.productId,
                leadFormat: "individual",
                website: "website",
                Projects: "GoITeens",
                Potential_Category: "Course",
                campaignId: null,
                adsetId: null,
                adId: null,
                esputnik: true,
                esputnik_formType: crmParams.esputnikFormType,
                esputnik_groups_name: crmParams.esputnikGroupsName,
            };

            // Додаємо UTM-параметри
            const enrichedParams = ensureUtmParams(params);

            const dataForRequest = {
                ...data,
                ...enrichedParams,
                // name: data.name?.trim(),
                // phone: data.phone?.trim(),
                // email: data.email?.trim(),
                // user: data.user,
            }

            // Відправляємо запит
            const response = await fetch("./services/zoho/zoho.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataForRequest),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log(data);

            trackFormSubmission(data);


            setSubmitedSuccess(true);

            formSuccessHandler();

            console.log("dataForRequest:", dataForRequest);


            // async/await
            if (afterSendFunction) {
                await afterSendFunction(dataForRequest);
            }

            
            if (crmParams.redirectUrl) {
                const paramsString = getParamsForRedirectUrl(dataForRequest, crmParams.redirectUrl);

                window.location.href = paramsString;
            }
        } catch (error) {
            handleError(error);
        }
    };

    const onError = (errors: FieldErrors<FormData>) => {
        console.log("Form validation errors:", errors);
    };

    return (
        <div className="relative">
            {isLoading && (
                <div className="inset-0 z-10 mt-[55px] h-[200px] max-w-[336px] md:ml-10 md:mt-14">
                    <h3 className="">
                        <span className="block">Зачекайте декілька секунд...</span>
                        <span className="block">майже отримали вашу заявку</span>
                    </h3>
                    <div className="progress-bar">
                        <div className="color"></div>
                    </div>
                </div>
            )}

            <div
                className={cn(
                    'form-wrapper',
                    isLoading ? 'hidden' : '',
                    submitedSuccess ? 'hidden' : ''
                )}
            >
                {!isClient ? (
                    <div className="form-loading-placeholder"></div>
                ) : formFields && formFields.inputs ? (
                    <form
                        className={cn('relative')}
                        noValidate
                        autoComplete="on"
                        onSubmit={handleSubmit(onSubmit, onError)}
                    >
                        <div className="form__content flex flex-wrap gap-6">
                            {formFields.inputs
                                // Фільтруємо поля для модального вікна якщо isModal=true
                                .filter(field => !crmParams.isModal || ['name', 'phone', 'email'].includes(field.name))
                                .map((fields: FormFieldConfig, index: number) => (
                                    <Input
                                        key={index}
                                        {...fields}
                                        register={register}
                                        error={errors}
                                        setValue={setValue}
                                        country={country}
                                        getValues={getValues}
                                        setCountry={setCountry}
                                        control={control as unknown as Control<FieldValues>}
                                    />
                                ))}
                            <button
                                className="btn-submit disabled:border-none disabled:bg-gray-200 disabled:hover:text-white"
                                type="submit"
                            >
                                {formFields.btnSubmit}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div>Форма недоступна</div>
                )}
            </div>

           
        </div>
    );
}


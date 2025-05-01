import { useState, useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  getIpInfo,
  setCookie,
  getCookie,
  readCookie,
  uid,
  getUtmParamsFromUrl,
  ensureUtmData
} from "@/lib/form-utils";
import type { UtmParams, IpInfo } from "@/lib/form-utils";

interface UseFormSubmitProps {
  form: UseFormReturn<any>;
  isModal?: boolean;
}

export default function useFormSubmit({
  form,
  isModal = false,
}: UseFormSubmitProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [action_source, setActionSource] = useState("");
  const [utmParams, setUtmParams] = useState<UtmParams>({
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
  });
  const [ipInfo, setIpInfo] = useState<IpInfo>({});

  const { reset } = form;

  useEffect(() => {
    setIsClient(true);

    const { origin, pathname } = window.location;
    setActionSource(`${origin}${pathname}`);


    const fetchIpInfo = async () => {
      const info = await getIpInfo();
      setIpInfo(info);
    };

    fetchIpInfo();


    const utmParamsFromUrl = getUtmParamsFromUrl();



    setUtmParams(utmParamsFromUrl);


    Object.entries(utmParamsFromUrl).forEach(([key, value]) => {
      if (value) {
        setCookie(key, value);
      }
    });
  }, []);


  const handleError = (error: any) => {
    console.error("Form submission error:", error);

    if (error instanceof Error) {
      setErrorMessage(error.message || "Сталася помилка при обробці запиту");
    } else if (typeof error === "string") {
      setErrorMessage(error);
    } else {
      setErrorMessage("Невідома помилка при обробці запиту");
    }

    setIsLoading(false);
  };

  // Функція для обробки успішного надсилання форми
  const formSuccessHandler = () => {
    document.dispatchEvent(new Event("formSubmitted"));
    reset();
    setIsLoading(false);
  };

  // Функція для відстеження надсилання форми в dataLayer
  const trackFormSubmission = (data: any) => {
    window.dataLayer?.push({
      event: "lead",
      phone: data.phone?.trim(),
      email: data.email?.trim(),
      conversionId: uid(),
    });
  };

  // Функція для забезпечення наявності UTM-параметрів у даних
  const ensureUtmParams = (data: any) => {
    return ensureUtmData(data, utmParams);
  };

  // Функція для отримання спільних даних запиту
  const getCommonRequestData = () => {
    return {
      SiteURL: action_source,
      leadActionSource: action_source,
      leadFBP: getCookie("_fbp"),
      leadFBC: getCookie("_fbc"),
      leadIP: ipInfo.ip || "",
      leadUserAgent: window.navigator.userAgent,
      google_id: readCookie("_ga"),
    };
  };

  return {
    isLoading,
    setIsLoading,
    isClient,
    errorMessage,
    setErrorMessage,
    action_source,
    utmParams,
    ipInfo,
    handleError,
    formSuccessHandler,
    trackFormSubmission,
    ensureUtmParams,
    getCommonRequestData,
  };
}

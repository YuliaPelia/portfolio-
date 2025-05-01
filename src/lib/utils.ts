import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export function getNameRegex(locale: string | null) {
    switch (locale) {
      case "pl":
        return /^.[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŹźŻż 'ʼ`-]{1,}$/i;
  
      case "en":
        return /^.[a-zA-Z 'ʼ`-]{1,}$/gm;
  
      case "ro":
        return /^.[a-zA-ZĂăÂâÎîȘșȚț 'ʼ`-]{1,}$/gm;
  
      case "es":
        return /^.[a-zA-ZáéíÑñóúü 'ʼ`-]{1,}$/gm;
  
      case "tr":
        return /^.[a-zA-ZÇçĞğÖöŞşÜü 'ʼ`-]{1,}$/gm;
  
      default:
        return /^.[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ 'ʼ`-]{1,}$/gm;
    }
  }
  
  /**
   * It returns the Email regular expression
   */
  export function getEmailRegex() {
    return /^(?=^.{3,63}$)(^[A-Za-z0-9_+]+(([_\.\-\+](?=[A-Za-z0-9_+]))[a-zA-Z0-9_+]+([\-\.\+](?=[A-Za-z0-9_+]))*?)*@(\w+([\.\-](?=(\w|\d))))+[a-zA-Z]{2,6})$/;
  }
  
export const getEnvVariableValue = (key: string): string | undefined => {
  if (!key) {
    throw new Error("Please pass the key to get value");
  }

  // Check if the key is present in window.env
  if (window?.env && window.env[key]) {
    return window.env[key];
  }

  // Check if the key is present in import.meta.env
  if (import.meta.env[key] !== undefined) {
    return import.meta.env[key];
  }

  // Return undefined if the key is not found
  return undefined;
};

/**
 *
 * @returns oject which contains device information
 */
// export const getDeviceInformation = () => {
//   return {
//     isMobile: navigator.userAgentData.mobile,
//     platform: navigator.userAgentData.platform,
//   };
// };

/**
 *
 * @param {any} data
 * @returns encoded string
 */
export const encode = (data: string) => {
  return btoa(data);
};

/**
 *
 * @param {string} data // encrypted data
 * @returns decoded string
 */
export const decode = (data: string) => {
  return atob(data);
};

/**
 *
 * @param {function} onSuccessCallBack
 * @param {function} onErrorCallBack
 */
interface GeolocationError {
  code: number;
  message: string;
}

interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}

type SuccessCallback = (position: GeolocationPosition) => void;
type ErrorCallback = (error: GeolocationError) => void;

export const getGeoLocation = (
  onSuccessCallBack: SuccessCallback,
  onErrorCallBack: ErrorCallback
): void => {
  if (!("geolocation" in navigator)) {
    const error: GeolocationError = {
      code: 0,
      message: "Geolocation not supported",
    };
    onErrorCallBack(error);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position: GeolocationPosition) => onSuccessCallBack(position),
    (error: GeolocationError) => onErrorCallBack(error)
  );
};

export const getLocalLanguage = () => {
  const localStorageObject = JSON.parse(getLocalStorage("defaultLocale"));
  return localStorageObject.defaultLanguage;
};

/**
 *
 * @param {string} data
 */
export const copyData = (data: string): void => {
  navigator.clipboard
    .writeText(data)
    .then(() => {
      console.log(">> Copied!!");
    })
    .catch(() => {
      console.log(">> Fail to copy");
    });
};

/**
 *
 * @param {string} key
 * read data from local storage
 */
export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key) ?? "";
};
/**
 *
 * @param {string} key
 * @param {string | object} value
 */
export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

/**
 *
 * @returns boolean value of the network status
 */
export const isOnline = () => {
  return navigator.onLine;
};

// multiple date formats
function addZero(i: number | string) {
  if (typeof i === "number" && i < 10) {
    i = "0" + i;
  }
  return i;
}

/**
 *
 * @param {integer} month
 * @returns previous date based on parameter passed or it default return on month back date
 */
export const getPrevMonthDate = (month = 1) => {
  const prevDate = new Date();
  prevDate.setMonth(prevDate.getMonth() - month);
  return prevDate;
};
/**
 *
 * @param {Date | string} date
 * @returns formatted Time With AM / PM
 */
export const formatTimeIn12HourFormat = (dateInString: string): string => {
  const date = new Date(dateInString);
  let hours: number = date.getHours();
  let minutes: number | string = date.getMinutes();
  const ampm: string = hours >= 12 ? "pm" : "am";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Add leading zero to minutes if needed
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const formattedTime = `${hours}:${minutes} ${ampm}`;
  return formattedTime;
};

/**
 *
 * @param {string} dateToFormat
 * @returns  formatted string from date object
 */
export const formattedDate = (dateToFormat: string): string => {
  if (!dateToFormat) return "";

  const addZero = (num: number): string => (num < 10 ? "0" + num : String(num));

  const myDate = new Date(dateToFormat);
  const month: string = addZero(myDate.getMonth() + 1);
  const date: string = addZero(myDate.getDate());
  const year: number = myDate.getFullYear();
  const hh: string = addZero(myDate.getHours());
  const mm: string = addZero(myDate.getMinutes());
  const ss: string = addZero(myDate.getSeconds());

  return `${date}/${month}/${year} ${hh}:${mm}:${ss}`;
};

// ---- Standard Validator ----
/**
 * Standard Validator functions to be used with simple-react-validator package
 * @returns validation object
 */
export const getStandardValidator = () => {
  return {
    mandatory: {
      message: "Mandatory",
      rule: (val: any, params?: any, validator?: any): boolean => {
        if (val.toString()) {
          return true;
        } else {
          return false;
        }
      },
      required: true, // optional
    },
    onlyPositive: {
      message: "Negative values are not allowed",
      rule: (val: any, params?: any, validator?: any): boolean => {
        if (val) {
          const isPositive = Math.sign(Number(val));
          if (isPositive < 0) {
            return false;
          }
          return true;
        } else {
          return true;
        }
      },
    },
    onlyInteger: {
      message: "Decimals not allowed",
      rule: (val: any, params?: any, validator?: any): boolean => {
        if (val) {
          const numericValue = Number(val);
          if (!(numericValue || numericValue === 0) && !isNaN(numericValue)) {
            return false;
          }
          const splitValue = val.toString().split(".");
          if (splitValue) {
            if (splitValue.length > 1) {
              return false;
            }
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      },
      messageReplace: (message: string, params?: any) => {
        // return message.replace(":type", "AA");
      },
    },
    max: {
      message: ":type",
      rule: (val: any, params?: any, validator?: any): boolean => {
        if (params[1] === "num") {
          if (parseFloat(val) > parseFloat(params[0])) {
            return false;
          } else {
            return true;
          }
        } else {
          if (val.length > parseFloat(params[0])) {
            return false;
          } else {
            return true;
          }
        }
      },
      messageReplace: (message: string, params?: any) => {
        if (params[1] === "num") {
          return message.replace(":type", `Max value is ${params[0]}`);
        } else {
          return message.replace(":type", `Max length ${params[0]} chars`);
        }
      },
    },
    min: {
      message: ":type",
      rule: (val: any, params?: any, validator?: any): boolean => {
        if (params[1] === "num") {
          if (parseFloat(val) < parseFloat(params[0])) {
            return false;
          } else {
            return true;
          }
        } else {
          if (val.length < parseFloat(params[0])) {
            return false;
          } else {
            return true;
          }
        }
      },
      messageReplace: (message: string, params?: any) => {
        if (params[1] === "num") {
          return message.replace(":type", `Min value is ${params[0]}`);
        } else {
          return message.replace(":type", `Min length ${params[0]} chars`);
        }
      },
    },
    maxDecimal: {
      message: "Enter only Four Decimal values",
      rule: (val: any, params?: any, validator?: any): boolean => {
        const re = new RegExp(`^\\d+\\.?\\d{0,${params[0]}}$`);

        if (re.test(val)) {
          return true;
        } else {
          return false;
        }
      },
    },
  };
};

/**
 * Message Replacement
 * @returns
 */
export const messageReplace = () => {
  return {
    messages: {
      alpha_num: "Special chars are not allowed",
      alpha_num_dash: "Special chars except dash (-) are not allowed",
      numeric: "Only numbers are allowed",
      // required: "validator.mandatory",
    },
  };
};

/**
 * parse the error message from object
 * @param {object} errorMessageObj
 * @returns formatted error string
 */
export const parseStandardAPIErrorMessage = (errorMessageObj: any) => {
  let prepareMessage = "";
  const errorDetails = errorMessageObj?.response?.data?.details;
  const errorMessage = errorMessageObj?.response?.data?.message;
  if (errorDetails) {
    if (errorDetails.length > 1) {
      for (let i = 0; i < errorDetails.length; i++) {
        const element = errorDetails[i];
        prepareMessage = prepareMessage + element + "\n";
      }
    } else {
      prepareMessage = errorDetails.at(0);
    }
    return prepareMessage;
  }
  if (errorMessage) {
    return errorMessage;
  }
  if (!errorMessage || !errorDetails) {
    return `Something Went Wrong!!!`;
  }
};

export function validateGetAPIResponse(res: any) {
  if (res?.status === 200 && res.data) return true;
  throw new Error();
}

export function validatePostAPIResponse(res: any) {
  if (res?.status === 201 && res.data) return true;
  throw new Error();
}
export function validatePutAPIResponse(res: any) {
  if (res?.status === 200 && res.data) return true;
  throw new Error();
}

export function logWithColor(message: string, color: any) {
  console.log(`%c ${message}`, `color:${color};font-weight:bolder;font-size:16px`);
}

export function deepCopy(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export function addRadialPatchOnMouseMove(selector: string) {
  const container: any = document.querySelector(selector);

  container?.addEventListener?.("mousemove", (e: any) => {
    const mouseX = e?.clientX - container.getBoundingClientRect().left;
    const mouseY = e?.clientY - container.getBoundingClientRect().top;

    const percentageX = (mouseX / container.clientWidth) * 100;
    const percentageY = (mouseY / container.clientHeight) * 100;

    if (container) {
      container.style.background = `radial-gradient(
        circle at ${percentageX}% ${percentageY}%,
        #24344d 15.88%,
        #11161e 100%
      )`;
    }
  });
}

//-------------------------Charts---------------------------//
export const LEGENDS_POSITION = {
  TOP_LEFT: "TOP_LEFT",
  TOP_CENTER: "TOP_CENTER",
  TOP_RIGHT: "TOP_RIGHT",
  BOTTOM_LEFT: "BOTTOM_LEFT",
  BOTTOM_CENTER: "BOTTOM_CENTER",
  BOTTOM_RIGHT: "BOTTOM_RIGHT",
};

export const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateDarkerColor = (color: string, factor: number) => {
  // Convert hexadecimal to RGB
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  // Darken the color, ensuring values don't go below 0
  const darkenedR = Math.max(0, Math.round(r * factor));
  const darkenedG = Math.max(0, Math.round(g * factor));
  const darkenedB = Math.max(0, Math.round(b * factor));

  // Convert back to hexadecimal
  const darkenedColor = `#${darkenedR.toString(16).padStart(2, "0")}${darkenedG
    .toString(16)
    .padStart(2, "0")}${darkenedB.toString(16).padStart(2, "0")}`;

  return darkenedColor;
};

export const getLegendPositionClass = (position: string) => {
  switch (position) {
    case LEGENDS_POSITION.TOP_LEFT:
      return "flex justify-start top-8";
    case LEGENDS_POSITION.TOP_CENTER:
      return "flex justify-center top-8";
    case LEGENDS_POSITION.TOP_RIGHT:
      return "flex justify-end top-8";
    case LEGENDS_POSITION.BOTTOM_LEFT:
      return "flex justify-start bottom-0";
    case LEGENDS_POSITION.BOTTOM_CENTER:
      return "flex justify-center bottom-0";
    case LEGENDS_POSITION.BOTTOM_RIGHT:
      return "flex justify-end bottom-0";
    default:
      return "flex justify-start top-8"; // Default value when legendsPosition is undefined
  }
};

export const BAR_CHART_TYPE = {
  HORIZONTAL: "HORIZONTAL",
  MULTI_AXIS: "MULTI_AXIS",
  VERTICAL_STACKED: "VERTICAL_STACKED",
};

export const LINE_CHART_TYPE = {
  MULTI_AXIS: "MULTI_AXIS",
};

//Capitalize first letter in a string
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

//Write a function to represent a number in a K, M, B and more formats
export const formatNumber = (num: number) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
};

//Generate regular expression from array
export function generateRegex(wordGroups: any[]) {
  // Construct the regex dynamically
  const regexString =
    "^" +
    wordGroups.map((group) => "(?=.*\\b(" + group.join("|") + ")\\b\\s*\\b)").join("") +
    "\\b";

  // Create a RegExp object with the constructed regex string
  const regex = new RegExp(regexString, "i");
  return regex;
}

//Generate random ID function
export const generateRandomId = (length = 8) => {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

import { ROUNDING_MODE } from "util/Constant";
const DEFAULT_ROUNDING_MODE = ROUNDING_MODE.ROUND;

export const dateFromater = (date, locale) => {
  return new Intl.DateTimeFormat(locale).format(date);
};

export const numberFormater = (
  number = 0,
  locale = window.locale?.defaultLocale,
  decimals = 2,
  roundingRule = DEFAULT_ROUNDING_MODE
) => {
  // get the number of decimalplace
  // get the rounding rule
  roundingRule(number);
  return parseFloat(number).toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const intlNumberFormater = (
  number = 0,
  locale = window.locale?.defaultLocale,
  decimals = 2,
  roundingRule = DEFAULT_ROUNDING_MODE
) => {
  let roundedNumber = roundingRule(number);
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(roundedNumber);
};
export const currencyFormater = (
  number = 0,
  locale = window.locale?.defaultLocale,
  decimals = 2,
  roundingRule = DEFAULT_ROUNDING_MODE
) => {
  let roundedNumber = roundingRule(number);
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    style: "currency",
    currency: window.locale?.defaultCurrency ?? "INR",
  }).format(roundedNumber);
};

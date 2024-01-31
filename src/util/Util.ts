import { getLocalStorage, setLocalStorage } from "util/CommonUtil";

export const updateDefaultLocaleSetting = (key: any, value: any) => {
  let defaultLocale = JSON.parse(getLocalStorage("defaultLocale") || "");
  defaultLocale = {
    ...defaultLocale,
    [key]: value,
  };
  setLocalStorage("defaultLocale", JSON.stringify(defaultLocale));
  window.location.reload();
};

// BorderStyle for BaseTheme

export const generateBorderStyle = (inputBorderWidth: any, inputBorderDirection: any) => {
  return (
    inputBorderWidth.inputBorderWidth.substring(0, 6) +
    inputBorderDirection.inputBorderDirection +
    inputBorderWidth.inputBorderWidth.substring(6, inputBorderWidth.inputBorderWidth.length)
  );
};

interface STYLE_OBJECT {
  primaryStyle?: object;
  secondaryStyle?: object;
  tertiaryStyle?: object;
  quaternaryStyle?: object;
  errorStyle?: object;
  overrideStyle?: object;
  overrideClasses?: string;
  disabledStyleProperty?: string[];
  removeStyleProperty?: string[];
  removeClasses?: string[];
  isDisabled?: boolean;
  isInvalid?: boolean;
  [key: string]: any; // additional property Allowed (for ternaryStyle or Other)
}

/**
 *
 * @param styleObject: Contains Style Object from base-theme, override classes etc.
 * @param variant: Contains variant from props.
 * @returns all properties stored in className variable
 */
export const generateClasses = (
  styleObject: STYLE_OBJECT,
  variant = "primary",
  color?: string
) => {
  const type = `${variant.toLowerCase()}TypeStyle`;
  variant = `${variant.toLowerCase()}Style`;
  color = `${color?.toLowerCase()}Style`;

  let styleClassObj = styleObject[variant] ? styleObject[variant] : styleObject["primaryStyle"];
  const typeClassObj = styleObject[type] && styleObject[type];

  const {
    overrideClasses = "",
    overrideStyle = {},
    removeStyleProperty = [],
    removeClasses = [],
    isInvalid,
    isDisabled,
  } = styleObject;

  styleClassObj = { ...styleClassObj, ...overrideStyle };
  if (typeClassObj) {
    styleClassObj = { ...styleClassObj, ...typeClassObj[color] };
  }

  if (isInvalid && styleClassObj.error)
    styleClassObj = { ...styleClassObj, ...styleClassObj.error };
  if (isDisabled && styleClassObj.disabled)
    styleClassObj = { ...styleClassObj, ...styleClassObj.disabled };

  let classes = "";
  //Add classes to classes and disabled classes to disabledClasses
  for (const styleClassKey in styleClassObj) {
    const currClass: any = styleClassObj[styleClassKey];
    if (
      !currClass ||
      removeStyleProperty.includes(styleClassKey) ||
      removeClasses.includes(currClass)
    ) {
      continue;
    }

    if (typeof currClass === "string") {
      classes += ` ${currClass} `;
    }
    if (typeof currClass === "function") {
      classes += ` ${currClass()} `;
    }
  }

  classes += ` ${overrideClasses} `;

  return classes;
};

export const generateClassesForButton = (
  styleObject: STYLE_OBJECT,
  variant = "primary",
  color?: string
) => {
  variant = `${variant.toLowerCase()}`;
  color = `${color?.toLowerCase()}`;

  const variantClassObj = styleObject[variant] ? styleObject[variant] : styleObject["primary"];
  let styleClassObj = variantClassObj[color] ? variantClassObj[color] : variantClassObj["default"];

  const {
    overrideClasses = "",
    overrideStyle = {},
    removeStyleProperty = [],
    removeClasses = [],
    isInvalid,
    isDisabled,
  } = styleObject;

  styleClassObj = { ...styleClassObj, ...overrideStyle };

  if (isInvalid && styleClassObj.error)
    styleClassObj = { ...styleClassObj, ...styleClassObj.error };
  if (isDisabled && styleClassObj.disabled)
    styleClassObj = { ...styleClassObj, ...styleClassObj.disabled };

  let classes = "";
  //Add classes to classes and disabled classes to disabledClasses
  for (const styleClassKey in styleClassObj) {
    const currClass: any = styleClassObj[styleClassKey];
    if (
      !currClass ||
      removeStyleProperty.includes(styleClassKey) ||
      removeClasses.includes(currClass)
    ) {
      continue;
    }

    if (typeof currClass === "string") {
      classes += ` ${currClass} `;
    }
    if (typeof currClass === "function") {
      classes += ` ${currClass()} `;
    }
  }

  classes += ` ${overrideClasses} `;

  return classes;
};

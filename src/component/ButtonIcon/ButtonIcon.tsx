import editIcon from "assets/img/common/edit_icon_blue.svg";
import editIconHover from "assets/img/common/edit_icon_hover.svg";
import Text from "component/Text/Text";
import { IButtonIcon } from "interface/component";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";

const BUTTON_TYPE = Object.freeze({
  EDIT_LABEL: {
    icon: editIcon,
    iconHover: editIconHover,
    size: " w-full h-full",
    label: "Edit details",
  },
});

const ButtonIcon: React.FC<IButtonIcon> = (props: IButtonIcon) => {
  const {
    type,
    disabled,
    toggle,
    sizeFull,
    iconClassName,
    className,
    blinkStyles,
    ...primeReactProps
  } = props;
  const [iconHover, setIconHover] = useState(false);
  const [blinkStyle, setBlinkStyle] = useState("");

  useEffect(() => {
    let intervalId: any = null;
    let shouldSetBlinkStyle = true;

    if (blinkStyles) {
      intervalId = setInterval(() => {
        setIconHover((prevIconHover) => !prevIconHover);

        if (shouldSetBlinkStyle && blinkStyles) {
          setBlinkStyle(blinkStyles);
        } else {
          setBlinkStyle("");
        }

        // Invert the flag for the next iteration
        shouldSetBlinkStyle = !shouldSetBlinkStyle;
      }, 500);

      setTimeout(() => {
        if (intervalId) {
          clearInterval(intervalId);
        }
        setIconHover(false);
        setBlinkStyle("");
      }, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [blinkStyles]);

  const getClassNames: any = () => {
    const classNames = "";
    return classNames;
  };

  const getIcon: any = (buttonType: any) => {
    const icon = BUTTON_TYPE[buttonType as keyof typeof BUTTON_TYPE];
    return icon;
  };

  const classNames: string = getClassNames();

  const icon: any = getIcon(type);

  const getBrightness: any = () => {
    return toggle
      ? ""
      : ` group-focus:brightness-75 ${iconClassName ? iconClassName : ""} w-3.5 h-3.5`;
  };

  const getImage = () => {
    if (iconHover) {
      return icon.iconHover;
    } else if (disabled) {
      return icon.iconDisabled;
    } else {
      return icon.icon;
    }
  };

  return (
    <div
      className={`${icon.size} flex items-center justify-center ${
        !disabled ? "cursor-pointer" : "bg-secondary-baseConcrete rounded-full"
      } ${blinkStyle}`}
      onMouseOver={() => setIconHover(!disabled && true)}
      onMouseOut={() => setIconHover(!disabled && false)}
    >
      <Button className={classNames || (className ?? "")} disabled={disabled} {...primeReactProps}>
        <img
          src={getImage()}
          className={
            disabled
              ? getBrightness()
              : `${!sizeFull ? ` ${iconClassName ? iconClassName : ""} h-3.5 w-3.5` : ""} `
          }
          alt=""
        />
        {icon.label && (
          <Text
            label={icon.label}
            className="text-body-copy-1 text-secondary-blueAzure-500 font-BrownMedium hover:text-primary-pText-900 ml-3 cursor-pointer"
          />
        )}
      </Button>
    </div>
  );
};

export default ButtonIcon;

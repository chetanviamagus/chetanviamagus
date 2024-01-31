import { BUTTON_BOX_STYLES } from "asset/base-theme";
import BaseButton, { IBaseButtonProps } from "component/base/BaseButton";
import { IButtonCommonStyleProps } from "component/interface/Button";
import { ButtonProps } from "primereact/button";
import React, { memo, useState } from "react";
import sendMessageIcon from "asset/img/icons/send-message.svg";
import sendMessageHoverIcon from "asset/img/icons/send_message_hover.svg";
import { useTranslation } from "react-i18next";
import { generateClassesForButton } from "util/Util";
import addFolderIcon from "asset/img/icons/add-folder-normal.svg";
import addFolderIconHover from "asset/img/icons/add-folder-hover.svg";

interface IconButtonType {
  ADD_FOLDER: "ADD_FOLDER";
  SEND_MESSAGE: "SEND_MESSAGE";
}

export const ICON_BUTTON: IconButtonType = {
  ADD_FOLDER: "ADD_FOLDER",
  SEND_MESSAGE: "SEND_MESSAGE",
};

const BUTTON_TYPE: { [key: string]: any } = {
  ADD_FOLDER: {
    icon: addFolderIcon,
    disabledIcon: addFolderIcon,
    hoveredIcon: addFolderIcon,
    selectedIcon: addFolderIconHover,
    tooltip: "Add Folder",
  },
  SEND_MESSAGE: {
    icon: sendMessageIcon,
    disabledIcon: sendMessageIcon,
    hoveredIcon: sendMessageHoverIcon,
    selectedIcon: sendMessageIcon,
    tooltip: "Add Folder",
  },
};

type ButtonBoxVariants = keyof typeof BUTTON_BOX_STYLES;
interface IButtonBoxProps extends IBaseButtonProps, IButtonCommonStyleProps {
  buttonType?: keyof IconButtonType;
  uid?: string;
  hideTooltip?: boolean;
  selected?: boolean;
  classNames?: string;
  variant?: ButtonBoxVariants;
  isIcon?: boolean;
}

const ButtonBox: React.FC<IButtonBoxProps> = (props: IButtonBoxProps) => {
  const [showLoader, setShowLoader] = useState(false);
  const getClassNames = () => {
    const styleObject = {
      ...BUTTON_BOX_STYLES,
      overrideStyle: props.styleObj,
      overrideClasses: props.className,
      isDisabled: props.disabled,
      removeStyleProperty: [],
      removeClasses: [],
    };

    return generateClassesForButton(styleObject, props.variant, props.color);
  };

  const {
    color,
    variant,
    onClickWithLoader,
    args,
    iconImg,
    buttonType,
    selected,
    uid,
    classNames,
    isIcon,
    ...primeReactProps
  } = props;

  const { value, name, label, iconPos, onClick, disabled, loadingIcon, icon } = primeReactProps;

  const { t } = useTranslation();
  const translatedLabel = t(label!, args);

  const onHandlerClick = async (e: any) => {
    if (onClick) {
      onClick(e);
    } else if (onClickWithLoader) {
      const res = onClickWithLoader();
      if (res && (await Promise.resolve(res)) === res) {
        setShowLoader(true);
        res
          .then((message: any) => {
            console.log(message);
            setShowLoader(false);
          })
          .catch(() => {
            setShowLoader(false);
          });
      }
    }
  };

  const [iconBtnImg, setIconBtnImg] = useState<string>("");

  const onHover = () => {
    if (!disabled) {
      if (buttonType) setIconBtnImg(BUTTON_TYPE[buttonType].hoveredIcon);
    }
  };

  const onLeave = () => {
    if (!buttonType) return;

    if (selected) setIconBtnImg(BUTTON_TYPE[buttonType].selectedIcon);
    else if (disabled) setIconBtnImg(BUTTON_TYPE[buttonType].disabledIcon);
    else setIconBtnImg(BUTTON_TYPE[buttonType].icon);
  };

  return (
    <>
      <BaseButton
        {...primeReactProps}
        color={color}
        className={getClassNames()}
        value={value}
        name={name}
        label={!iconImg ? translatedLabel : undefined}
        loadingIcon={loadingIcon}
        iconPos={iconPos ?? "right"}
        icon={icon}
        onClick={onHandlerClick}
        loading={showLoader}
        disabled={showLoader || disabled}
      >
        {iconImg && (
          <div className={`flex w-full items-center gap-x-1.5 ${isIcon && "justify-center"}`}>
            {isIcon ? (
              <div className="">{iconImg}</div>
            ) : (
              <div className="flex items-center justify-center border-r border-dark-oauth-btn-border-hover px-6">
                <img src={iconImg} alt={"icon"} className="" height={20} width={20} />
              </div>
            )}

            <div className={`flex  items-center ${!isIcon && "flex-1 justify-center"}`}>
              {translatedLabel}
            </div>
          </div>
        )}
        {variant === "icon" && buttonType && (
          <img
            src={iconBtnImg ? iconBtnImg : BUTTON_TYPE[buttonType].icon}
            alt={BUTTON_TYPE[buttonType].tooltip}
            // className="h-4 w-4"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
          />
        )}
      </BaseButton>
    </>
  );
};

// Memoization

// redux wiring

// exports
export default memo(ButtonBox);

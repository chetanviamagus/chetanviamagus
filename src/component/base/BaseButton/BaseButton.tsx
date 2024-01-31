import React from "react";
import { Button, ButtonProps } from "primereact/button";
import { IBaseButtonCommonProps } from "../../interface/Button";

export interface IBaseButtonProps extends ButtonProps, IBaseButtonCommonProps {}

const BaseButton: React.FC<IBaseButtonProps> = (props: IBaseButtonProps) => {
  const { className, iconPos, loadingIcon, icon, disabled, isdisabledbyacl , onClick } = props;
  return (
    <>
      <Button
        {...props}
        className={className}
        loadingIcon={loadingIcon}
        iconPos={iconPos}
        onClick={onClick}
        icon={icon}
        disabled={disabled ? disabled : isdisabledbyacl}
      />
    </>
  );
};

export default BaseButton;

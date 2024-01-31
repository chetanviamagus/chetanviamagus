import { Dialog, DialogProps } from "primereact/dialog";
import React from "react";

interface IBaseDialogProps extends DialogProps {
  variant?: "default" | "secondary";
}

const DialogBox: React.FC<IBaseDialogProps> = (props: IBaseDialogProps) => {
  const { visible, header, modal, variant } = props;

  return (
    <div className="dialog-box group grid">
      <Dialog
        visible={visible}
        header={header}
        modal={modal}
        maskClassName={`bg-black/80 ${variant === "secondary" ? "no-mask" : ""}`}
        {...props}
      >
        {props.children}
      </Dialog>
    </div>
  );
};

export default DialogBox;

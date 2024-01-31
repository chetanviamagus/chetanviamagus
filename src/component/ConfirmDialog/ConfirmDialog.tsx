import ButtonBox from "component/ButtonBox/ButtonBox";
import DialogBox from "component/Dialog/Dialog";
import LinkButton from "component/LinkButton/LinkButton";
import Text from "component/Text/Text";
import React from "react";

interface IConfirmDialogProps {
  variant?: "default" | "secondary";
  headerText?: string;
  content?: string;
  primaryButtonText?: string;
  primaryButtonColor?: string;
  secondaryButtonText?: string;
  showDialog: boolean;
  closeDialog: () => void;
  primaryButtonClick?: () => void;
}

const ConfirmDialog: React.FC<IConfirmDialogProps> = (props: IConfirmDialogProps) => {
  const {
    showDialog,
    headerText,
    content,
    primaryButtonText,
    secondaryButtonText,
    primaryButtonColor,
    primaryButtonClick,
    closeDialog,
  } = props;

  const dialogContainer = () => {
    return (
      <div className="flex w-76 flex-col justify-center rounded-xl bg-dark-neutral-gray-200 px-6 py-8.5">
        <Text
          label={headerText}
          className="pb-3 text-center text-lg font-semibold text-dark-text-main"
        />

        <div className="w-full pb-6 text-center text-sm text-dark-neutral-gray-900">
          <Text label={content} />
        </div>

        <div className="flex w-full flex-col items-center gap-3">
          <ButtonBox
            color={primaryButtonColor ? primaryButtonColor : ""}
            label={primaryButtonText}
            onClick={primaryButtonClick}
          />

          <LinkButton
            path=""
            label={secondaryButtonText}
            className="text-sm text-dark-neutral-gray-900"
            onClick={closeDialog}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="dialog-box group grid">
      <DialogBox
        visible={showDialog}
        closable={false}
        onHide={() => {
          closeDialog();
        }}
      >
        {dialogContainer()}
      </DialogBox>
    </div>
  );
};

export default ConfirmDialog;

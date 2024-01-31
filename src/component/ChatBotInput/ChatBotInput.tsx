import { SparklesIcon } from "@heroicons/react/24/outline";
import ButtonBox from "component/ButtonBox/ButtonBox";
import InputTextArea from "component/InputTextArea/InputTextArea";
import LinkButton from "component/LinkButton/LinkButton";
import { useState } from "react";

interface ChatBotInputProps {
  handleSend: (value: string) => void;
  placeholder?: string;
  variant?: "primary" | "secondary";
  onClickInfoDialog?: () => void;
}

const ChatBotInput: React.FC<ChatBotInputProps> = (props: ChatBotInputProps) => {
  const { handleSend, variant, onClickInfoDialog, placeholder } = props;

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if the Enter key is pressed
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents the new line character from being inserted
      handleSendClick();
    }
  };

  const handleSendClick = () => {
    handleSend(inputValue);
    setInputValue("");
  };

  return (
    <div className="relative mx-auto w-full">
      {variant !== "secondary" ? (
        <>
          <div className="absolute bottom-3 left-3">
            <SparklesIcon className="h-6 w-6 text-dark-neutral-gray-700" />
          </div>

          <InputTextArea
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="!h-12 w-full bg-dark-neutral-gray-100 !px-12 py-3.5"
            placeholder={placeholder ?? "Type here..."}
            rows={10}
            autoResize
            hideLabel
            hideErrorRow
          />

          <ButtonBox
            variant="icon"
            buttonType="SEND_MESSAGE"
            className="absolute bottom-1.5 right-1 border-none text-dark-neutral-gray-600 hover:text-dark-neutral-gray-900"
            onClick={handleSendClick}
          />
        </>
      ) : (
        <>
          <div className="absolute left-3 top-4">
            <SparklesIcon className="h-6 w-6 text-dark-neutral-gray-700" />
          </div>

          <InputTextArea
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="!h-21.5 w-full bg-dark-neutral-gray-100 !px-12 py-4"
            placeholder="Type here..."
            rows={10}
            autoResize
            hideLabel
            hideErrorRow
          />

          <div className="absolute bottom-[0.5px] left-[1.5px] right-[1.5px] flex h-9 items-center rounded-b-lg bg-dark-neutral-gray-200">
            <LinkButton
              path=""
              label="Hawkeye Interpretation"
              className="px-3 text-xxs text-dark-neutral-gray-800"
              onClick={() => {
                if (onClickInfoDialog) {
                  onClickInfoDialog();
                }
              }}
            />
          </div>

          <ButtonBox
            variant="icon"
            buttonType="SEND_MESSAGE"
            className="absolute right-1 top-2 border-none text-dark-neutral-gray-600 hover:text-dark-neutral-gray-900"
            onClick={handleSendClick}
          />
        </>
      )}
    </div>
  );
};

export default ChatBotInput;

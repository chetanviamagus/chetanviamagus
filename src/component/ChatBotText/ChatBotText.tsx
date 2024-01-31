import { AnimateTyping } from "component/AnimateTyping";
import React, { useEffect, useRef, useState } from "react";
import hawkEyeLogo from "asset/img/logos/logo.svg";
import useImage from "asset/img/dp.png";
import LinkButton from "component/LinkButton/LinkButton";
import IconSelector from "component/IconSelector/IconSelector";
import logo1 from "asset/img/icons/kroger_icon.svg";
import logo2 from "asset/img/project/project_logo_2.svg";
import logo3 from "asset/img/project/project_logo_3.svg";
import logo4 from "asset/img/project/project_logo_4.svg";
import logo5 from "asset/img/project/project_logo_5.svg";
import logo6 from "asset/img/project/project_logo_6.svg";
import logo7 from "asset/img/project/project_logo_7.svg";
import logo8 from "asset/img/project/project_logo_8.svg";
import logo9 from "asset/img/project/project_logo_9.svg";
import logo10 from "asset/img/project/project_logo_10.svg";
import logo11 from "asset/img/project/project_logo_11.svg";
import logo12 from "asset/img/project/project_logo_12.svg";
import FileUploadDemo from "component/FileUploadDemo/FileUploadDemo";

interface TypingTextProps {
  text: string | React.ReactNode;
  chatIcon?: string;
  sender?: "assistant" | "user";
  isFirstTime?: boolean;
  shouldSkip?: boolean;
  editProjectDetails?: boolean;
  editProject?: () => void;
  onSkip?: () => void;
  showUploadIcon?: boolean;
  projectIcon?: (image: string) => void;
}

const ChatBotText: React.FC<TypingTextProps> = (props: TypingTextProps) => {
  const {
    text,
    sender,
    isFirstTime,
    shouldSkip,
    onSkip,
    showUploadIcon,
    projectIcon,
    editProjectDetails,
    editProject,
  } = props;
  const [showSkip, setShowSkip] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showIconUploadSection, setShowIconUploadSection] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"icon" | "file" | null>(null);

  useEffect(() => {
    let showTimeoutId: NodeJS.Timeout;
    let hideTimeoutId: NodeJS.Timeout;
    if (shouldSkip) {
      // Set showSkip to true after the initial delay
      showTimeoutId = setTimeout(() => {
        setShowSkip(true);
      }, 2500);

      // Set showSkip back to false after another interval (e.g., 5000 milliseconds)
      hideTimeoutId = setTimeout(() => {
        setShowSkip(false);
      }, 7000);

      return () => {
        setShowSkip(false);
        clearTimeout(showTimeoutId);
        clearTimeout(hideTimeoutId);
      };
    }
  }, [shouldSkip]);

  useEffect(() => {
    let showTimeoutId: NodeJS.Timeout;
    let hideTimeoutId: NodeJS.Timeout;
    if (editProjectDetails) {
      showTimeoutId = setTimeout(() => {
        setShowEdit(true);
      }, 1500);

      hideTimeoutId = setTimeout(() => {
        setShowEdit(false);
      }, 9000);

      return () => {
        setShowEdit(false);
        clearTimeout(showTimeoutId);
        clearTimeout(hideTimeoutId);
      };
    }
  }, [editProjectDetails]);

  //Function used to show the upload section after certain delay
  useEffect(() => {
    if (showUploadIcon && isFirstTime) {
      const timeoutId = setTimeout(() => {
        setShowIconUploadSection(true);
      }, 2000);

      return () => clearTimeout(timeoutId);
    } else if (showUploadIcon && !isFirstTime) {
      setShowIconUploadSection(true);
    }
  }, [showUploadIcon]);

  const handleImageSelect = (image: string, method: "icon" | "file") => {
    setSelectedImage(image);
    setUploadMethod(method);
    if (image) {
      projectIcon && projectIcon(image);
    } // Pass the selected image to the parent
  };

  const iconUploadSection = () => {
    return (
      <div className="flex w-full items-center gap-8">
        <IconSelector
          images={[
            logo1,
            logo2,
            logo3,
            logo4,
            logo5,
            logo6,
            logo7,
            logo8,
            logo9,
            logo10,
            logo11,
            logo12,
          ]}
          onImageSelect={(image: string) => handleImageSelect(image, "icon")}
          imageUploaded={selectedImage && uploadMethod === "file"}
        />
        <>or</>
        <FileUploadDemo
          onFileSelect={(files: any) => {
            if (files.length > 0) {
              handleImageSelect(URL.createObjectURL(files[0]), "file");
            }
          }}
        />
      </div>
    );
  };

  return (
    <div
      className={`flex w-full justify-start ${sender === "user" ? "justify-end" : ""} ${
        showSkip ? "pb-5" : ""
      }`}
    >
      <div className={`flex w-4/5 ${sender === "user" ? "justify-end" : ""}`}>
        <div
          className={`relative flex max-w-fit gap-6 rounded-md ${
            sender === "user"
              ? "flex-row-reverse bg-dark-user-chat-gradient"
              : "bg-dark-assistant-chat-gradient"
          } bg-dark-assistant-chat-gradient p-6`}
        >
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white">
            <img
              src={sender === "user" ? useImage : hawkEyeLogo}
              alt="chat_icon"
              className={`h-3.5 w-4 ${sender === "user" ? "h-full w-full" : ""}`}
            />
          </span>
          {sender === "user" || !isFirstTime ? (
            <div className="flex flex-col gap-4">
              {text}
              {showUploadIcon && showIconUploadSection ? iconUploadSection() : null}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <AnimateTyping delay={25}>{text}</AnimateTyping>
              {showUploadIcon && showIconUploadSection ? iconUploadSection() : null}
            </div>
          )}

          {showSkip && (
            <div className="absolute -bottom-6 right-0 text-sm">
              <LinkButton
                label={"Skip"}
                path=""
                className="!text-dark-neutral-gray-800"
                onClick={() => {
                  onSkip && onSkip();
                }}
              />
            </div>
          )}

          {showEdit && (
            <div className="absolute -bottom-6 right-0 text-sm">
              <LinkButton
                label={"Edit Project Details"}
                path=""
                className="!text-dark-neutral-gray-800"
                onClick={() => {
                  editProject && editProject();
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBotText;

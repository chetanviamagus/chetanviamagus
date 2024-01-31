import { ChevronRightIcon } from "@heroicons/react/24/outline";
import projectSuccessIcon from "asset/img/project/project_success_image.png";
import ButtonBox from "component/ButtonBox/ButtonBox";
import ChatBotInput from "component/ChatBotInput/ChatBotInput";
import ChatBotText from "component/ChatBotText/ChatBotText";
import DialogBox from "component/Dialog/Dialog";
import LinkButton from "component/LinkButton/LinkButton";
import Loader from "component/Loader/Loader";
import Stepper from "component/Stepper/Stepper";
import Text from "component/Text/Text";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { linkAuthRoute, linkProjectBase, linkProjectList } from "routes";
import { capitalizeFirstLetter, generateRandomId } from "util/CommonUtil";
import PageConnectData from "../PageConnectData/PageConnectData";
import ConfirmDialog from "component/ConfirmDialog/ConfirmDialog";
interface ChatMessage {
  text?: string;
  sender?: "user" | "assistant";
  projectName?: string;
  projectDescription?: string;
  projectIcon?: string;
  isFirstTime?: boolean;
  shouldSkip?: boolean;
  showUploadIcon?: boolean;
  editProjectDetails?: boolean;
  connectData?: boolean;
  showConnectData?: boolean;
}
interface ProjectInfo {
  projectName?: string;
  projectDescription?: string;
  projectIcon?: string;
}
interface IStepper {
  state: "completed" | "active" | "pending" | "failed";
  label: string;
  command?: () => void;
}

const initialProjectInfo: ProjectInfo = {
  projectName: "",
  projectDescription: "",
  projectIcon: "",
};

const PageCreateProject: React.FC = () => {
  const initialStepperData: IStepper[] = [
    { state: "active", label: "Set up a project" },
    { state: "pending", label: "Connect data" },
  ];
  const finalStepperData: IStepper[] = [
    {
      state: "completed",
      label: "Set up a project",
      // command: () => setShowConnectDataContainer(false),
    },
    { state: "active", label: "Connect data" },
  ];

  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>(initialProjectInfo);
  const [stepperData, setStepperData] = useState<IStepper[]>(initialStepperData);
  const [showConnectData, setShowConnectData] = useState<boolean>(false);
  const [showConnectDataContainer, setShowConnectDataContainer] = useState<boolean>(false);
  const [pageLoader, setPageLoader] = useState<boolean>(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const [isProjectCreated, setIsProjectCreated] = useState<boolean>(false);
  const [showCancelDialog, setShowCancelDialog] = useState<boolean>(false);

  useEffect(() => {
    // Scroll to the bottom of the chat container when chatMessages change
    const chatContainer = document.getElementById("chatContainer");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatMessages]);

  //Get related information from local storage
  const storedChatMessages = localStorage.getItem("projectChatMessages");
  const storedProjectInfo = localStorage.getItem("projectInfo");
  const projectChatMessages = localStorage.getItem("projectChatMessages");
  const projects = localStorage.getItem("projects");

  useEffect(() => {
    // Load conversation from local storage when the component mounts
    if (storedChatMessages) {
      const parsedMessages = JSON.parse(storedChatMessages);
      // If already present, update isFirstTime to false and set the conversation from local storage
      const updatedMessages = parsedMessages.map((message: ChatMessage) => ({
        ...message,
        isFirstTime: false,
        shouldSkip: false,
      }));
      // If already present, set the conversation from local storage
      setChatMessages(updatedMessages);
      updatedMessages.map((data: ChatMessage) => {
        setTimeout(() => {
          data.connectData && !data.editProjectDetails && setShowConnectData(true);
        }, 1500);
        data.showConnectData && setShowConnectDataContainer(true);
        data.showConnectData && setStepperData(finalStepperData);
        // data.showConnectData && setIsSaveDisabled(false);
      });
    } else {
      // If no stored messages, add the initial bot message
      const initialBotMessage: ChatMessage = {
        text: "Excited to start! What's our project called?",
        sender: "assistant",
        isFirstTime: true,
      };

      setChatMessages([initialBotMessage]);
      // Save updated conversation to local storage
      localStorage.setItem("projectChatMessages", JSON.stringify([initialBotMessage]));
    }
  }, []);

  useEffect(() => {
    if (storedProjectInfo) {
      const parsedProjectInfo = JSON.parse(storedProjectInfo);
      setProjectInfo(parsedProjectInfo);
    }
  }, []);

  const handleSend = (value: string) => {
    const lastMessage = chatMessages.length > 0 ? chatMessages[chatMessages.length - 1] : null;
    // Check if the sender is "user" and return without further actions
    if (lastMessage && lastMessage.sender === "user") {
      // Check if the current sender is the same as the last sender
      if (lastMessage.sender === "user") {
        // Return without further actions
        return;
      }
    }

    //Actual message functionality
    const userMessage: ChatMessage = {
      text: value,
      sender: "user",
    };

    setChatMessages((prevMessages) => [...prevMessages, userMessage]);

    // Save updated conversation to local storage
    localStorage.setItem("projectChatMessages", JSON.stringify([...chatMessages, userMessage]));

    // Check for specific strings in user input and provide custom responses
    if (chatMessages[chatMessages.length - 1]?.text?.toLowerCase().includes("start")) {
      setProjectInfo({ ...projectInfo, projectName: capitalizeFirstLetter(value) });
      setTimeout(() => {
        const botMessage: ChatMessage = {
          projectName: capitalizeFirstLetter(value),
          text: "Nice, now can you describe this project",
          sender: "assistant",
          isFirstTime: true,
          shouldSkip: true,
        };
        setChatMessages((prevMessages) => [...prevMessages, botMessage]);
        // Save updated conversation to local storage
        localStorage.setItem(
          "projectChatMessages",
          JSON.stringify([...chatMessages, userMessage, botMessage])
        );
        localStorage.setItem(
          "projectInfo",
          JSON.stringify({ ...projectInfo, projectName: capitalizeFirstLetter(value) })
        );
      }, 1000);
    } else if (chatMessages[chatMessages.length - 1]?.text?.toLowerCase().includes("describe")) {
      setProjectInfo({
        ...projectInfo,
        projectDescription: capitalizeFirstLetter(value),
      });
      setTimeout(() => {
        const botMessage: ChatMessage = {
          projectDescription: capitalizeFirstLetter(value),
          text: `Pick an icon for Project-${projectInfo.projectName} from the options or give hints for a better match`,
          sender: "assistant",
          isFirstTime: true,
          shouldSkip: true,
          showUploadIcon: true,
        };
        setChatMessages((prevMessages) => [
          ...prevMessages.map((message: ChatMessage) =>
            message.sender === "assistant" ? { ...message, shouldSkip: false } : message
          ),
          botMessage,
        ]);

        // Save updated conversation to local storage
        localStorage.setItem(
          "projectChatMessages",
          JSON.stringify([
            ...chatMessages.map((message) =>
              message.sender === "assistant" ? { ...message, shouldSkip: false } : message
            ),
            userMessage,
            botMessage,
          ])
        );
        localStorage.setItem(
          "projectInfo",
          JSON.stringify({
            ...projectInfo,
            projectDescription: capitalizeFirstLetter(value),
          })
        );
      }, 1000);
    } else if (value.toLowerCase().includes("name")) {
      setTimeout(() => {
        const botMessage: ChatMessage = {
          text: "What's our project called?",
          sender: "assistant",
          isFirstTime: true,
        };
        setChatMessages((prevMessages) => [...prevMessages, botMessage]);
        // Save updated conversation to local storage
        localStorage.setItem(
          "projectChatMessages",
          JSON.stringify([...chatMessages, userMessage, botMessage])
        );
      }, 1000);
    } else if (value.toLowerCase().includes("description")) {
      setTimeout(() => {
        const botMessage: ChatMessage = {
          text: "What's our project description?",
          sender: "assistant",
          isFirstTime: true,
        };
        setChatMessages((prevMessages) => [...prevMessages, botMessage]);
        // Save updated conversation to local storage
        localStorage.setItem(
          "projectChatMessages",
          JSON.stringify([...chatMessages, userMessage, botMessage])
        );
      }, 1000);
    } else if (value.toLowerCase().includes("icon")) {
      setTimeout(() => {
        const botMessage: ChatMessage = {
          text: `Pick an icon for Project-${projectInfo.projectName} from the options or give hints for a better match`,
          sender: "assistant",
          isFirstTime: true,
          showUploadIcon: true,
        };
        setChatMessages((prevMessages) => [...prevMessages, botMessage]);
        // Save updated conversation to local storage
        localStorage.setItem(
          "projectChatMessages",
          JSON.stringify([...chatMessages, userMessage, botMessage])
        );
      }, 1000);
    } else if (chatMessages[chatMessages.length - 1]?.text?.toLowerCase().includes("called")) {
      setProjectInfo({ ...projectInfo, projectName: capitalizeFirstLetter(value) });
      setTimeout(() => {
        const botMessage: ChatMessage = {
          projectName: capitalizeFirstLetter(value),
          text: "Great! Let's continue to connect your data",
          sender: "assistant",
          isFirstTime: true,
          editProjectDetails: true,
          connectData: true,
        };
        setChatMessages((prevMessages) => [...prevMessages, botMessage]);
        setTimeout(() => {
          setShowConnectData(true);
        }, 1500);
        // Save updated conversation to local storage
        localStorage.setItem(
          "projectChatMessages",
          JSON.stringify([...chatMessages, userMessage, botMessage])
        );
        localStorage.setItem(
          "projectInfo",
          JSON.stringify({ ...projectInfo, projectName: capitalizeFirstLetter(value) })
        );
      }, 1000);
    } else if (chatMessages[chatMessages.length - 1]?.text?.toLowerCase().includes("description")) {
      setProjectInfo({
        ...projectInfo,
        projectDescription: capitalizeFirstLetter(value),
      });
      setTimeout(() => {
        const botMessage: ChatMessage = {
          projectDescription: capitalizeFirstLetter(value),
          text: "Great! Let's continue to connect your data",
          sender: "assistant",
          isFirstTime: true,
          editProjectDetails: true,
          connectData: true,
        };
        setChatMessages((prevMessages) => [...prevMessages, botMessage]);
        setTimeout(() => {
          setShowConnectData(true);
        }, 1500);
        // Save updated conversation to local storage
        localStorage.setItem(
          "projectChatMessages",
          JSON.stringify([...chatMessages, userMessage, botMessage])
        );
        localStorage.setItem(
          "projectInfo",
          JSON.stringify({ ...projectInfo, projectDescription: capitalizeFirstLetter(value) })
        );
      }, 1000);
    } else {
      // Simulate a delay for the generic bot response
      setTimeout(() => {
        const botMessage: ChatMessage = {
          text: `I received: ${value}. How may I help you?`,
          sender: "assistant",
          isFirstTime: true,
        };
        setChatMessages((prevMessages) => [...prevMessages, botMessage]);
        // Save updated conversation to local storage
        localStorage.setItem(
          "projectChatMessages",
          JSON.stringify([...chatMessages, userMessage, botMessage])
        );
      }, 1000);
    }
  };

  const handleIconUpload = (image: string) => {
    setProjectInfo({ ...projectInfo, projectIcon: image });
    const finalBotMessage: ChatMessage = {
      projectIcon: image,
      text: "Great! Let's continue to connect your data",
      sender: "assistant",
      isFirstTime: true,
      editProjectDetails: true,
      connectData: true,
    };

    setChatMessages((prevMessages) => [...prevMessages, finalBotMessage]);
    setTimeout(() => {
      setShowConnectData(true);
    }, 1500);
    // Save updated conversation to local storage
    localStorage.setItem("projectChatMessages", JSON.stringify([...chatMessages, finalBotMessage]));
    localStorage.setItem("projectInfo", JSON.stringify({ ...projectInfo, projectIcon: image }));
  };

  const handleSKip = () => {
    if (chatMessages[chatMessages.length - 1]?.text?.toLowerCase().includes("describe")) {
      setProjectInfo({
        ...projectInfo,
        projectDescription: "",
      });
      setTimeout(() => {
        const botMessage: ChatMessage = {
          projectDescription: "",
          text: `Pick an icon for Project-${projectInfo.projectName} from the options or give hints for a better match`,
          sender: "assistant",
          isFirstTime: true,
          shouldSkip: true,
          showUploadIcon: true,
        };
        setChatMessages((prevMessages) => [
          ...prevMessages.map((message: ChatMessage) =>
            message.sender === "assistant" ? { ...message, shouldSkip: false } : message
          ),
          botMessage,
        ]);

        // Save updated conversation to local storage
        localStorage.setItem(
          "projectChatMessages",
          JSON.stringify([
            ...chatMessages.map((message) =>
              message.sender === "assistant" ? { ...message, shouldSkip: false } : message
            ),
            botMessage,
          ])
        );
        localStorage.setItem(
          "projectInfo",
          JSON.stringify({
            ...projectInfo,
            projectDescription: "",
          })
        );
      }, 1000);
    } else if (chatMessages[chatMessages.length - 1]?.text?.toLowerCase().includes("icon")) {
      setProjectInfo({ ...projectInfo, projectIcon: "" });
      const finalBotMessage: ChatMessage = {
        projectIcon: "",
        text: "Fine! Let's continue to connect your data",
        sender: "assistant",
        isFirstTime: true,
        editProjectDetails: true,
        connectData: true,
      };

      setChatMessages((prevMessages) => [...prevMessages, finalBotMessage]);
      setTimeout(() => {
        setShowConnectData(true);
      }, 1500);
      // Save updated conversation to local storage
      localStorage.setItem(
        "projectChatMessages",
        JSON.stringify([...chatMessages, finalBotMessage])
      );
      localStorage.setItem("projectInfo", JSON.stringify({ ...projectInfo, projectIcon: "" }));
    }
  };

  const handleEditProject = () => {
    setShowConnectData(false);
    const botMessage: ChatMessage = {
      text: "Sure, what do you want to edit?",
      sender: "assistant",
      isFirstTime: true,
    };

    setChatMessages((prevMessages) => [...prevMessages, botMessage]);

    // Save updated conversation to local storage
    localStorage.setItem("projectChatMessages", JSON.stringify([...chatMessages, botMessage]));
  };

  const handleConnectData = () => {
    const botMessage: ChatMessage = {
      showConnectData: true,
    };
    localStorage.setItem("projectChatMessages", JSON.stringify([...chatMessages, botMessage]));
    setPageLoader(true);
    // window.location.reload();
    setTimeout(() => {
      setPageLoader(false);
      setShowConnectDataContainer(true);
      setStepperData(finalStepperData);
    }, 2000);
  };

  const onSave = () => {
    const randomId = generateRandomId();
    if (projectChatMessages && storedProjectInfo) {
      if (projects) {
        // Parse existing "projects" data or initialize an empty array
        const getProjects = JSON.parse(projects);
        // Create a new project object with the chat messages and info
        const newProject = {
          id: randomId,
          projectChatMessages: JSON.parse(projectChatMessages),
          projectInfo: JSON.parse(storedProjectInfo),
        };
        // Add the new project to the array
        getProjects.push(newProject);

        // Store the updated array back in localStorage
        localStorage.setItem("projects", JSON.stringify(getProjects));
        localStorage.removeItem("projectChatMessages");
        localStorage.removeItem("projectInfo");
      } else {
        // Create a new project object with the chat messages and info
        const newProject = {
          id: randomId,
          projectChatMessages: JSON.parse(projectChatMessages),
          projectInfo: JSON.parse(storedProjectInfo),
        };
        localStorage.setItem("projects", JSON.stringify([newProject]));
        localStorage.removeItem("projectChatMessages");
        localStorage.removeItem("projectInfo");
      }
    }

    setIsProjectCreated(true);
    setTimeout(() => {
      navigate(`${linkAuthRoute}${linkProjectList}`);
      // navigate(linkAuthRoute + `${linkProjectBase}/${randomId ?? "uid"}/chat`);
    }, 2500);
  };

  const onProjectCancel = () => {
    setShowCancelDialog(false);
    localStorage.removeItem("projectChatMessages");
    localStorage.removeItem("projectInfo");
    navigate(linkAuthRoute + linkProjectList);
  };

  const setUpProjectContainer = () => {
    return (
      <>
        <div
          className="screen-bg relative flex w-full flex-col gap-3 overflow-y-auto rounded-4.5 pb-10"
          style={{ height: "calc(100vh - 90px)", scrollBehavior: "smooth" }}
          id="chatContainer"
        >
          <div className=" flex h-full flex-col gap-6 p-4">
            {chatMessages.map((message, index) => (
              <div key={index} className={index === chatMessages.length - 1 ? "pb-23" : ""}>
                <ChatBotText
                  key={index}
                  text={message.text}
                  sender={message.sender}
                  isFirstTime={message.isFirstTime}
                  shouldSkip={message.shouldSkip}
                  showUploadIcon={message.showUploadIcon}
                  editProjectDetails={message.editProjectDetails}
                  editProject={handleEditProject}
                  onSkip={handleSKip}
                  projectIcon={(image) => handleIconUpload(image)}
                />
              </div>
            ))}
          </div>
        </div>

        {!showConnectData ? (
          <div className="absolute bottom-5 right-2 px-4" style={{ width: "calc(100% - 184px)" }}>
            <ChatBotInput handleSend={(text: string) => handleSend(text)} />
          </div>
        ) : (
          <div className="absolute bottom-2 right-[40%] ">
            <div className="relative w-full min-w-40">
              <ButtonBox className="" label={"Connect Data"} onClick={handleConnectData} />
              <ChevronRightIcon className="absolute right-2 top-2.5 h-4 w-4" />
            </div>
          </div>
        )}
      </>
    );
  };

  const projectSuccessContainer = () => {
    return (
      <div className="flex h-full w-full items-center ">
        <div className="flex w-full flex-col items-center justify-center gap-10">
          <img
            src={projectSuccessIcon}
            alt="project-success"
            className=" h-21.5 w-21.5 animate-bounce"
          />

          <Text label={"Project Created"} className="text-xl font-bold text-dark-text-main" />
        </div>
      </div>
    );
  };

  const showPageLoader = () => {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  };

  const createProjectMainContainer = () => {
    return !isProjectCreated ? (
      <>
        <div className="mb-3 flex w-full items-center justify-between gap-3 border-dark-neutral-gray-200 pt-3">
          <div className="text-2xl font-bold text-dark-text-main">
            <Text label={"Create a Project"} />
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="max-w-fit">
              <LinkButton
                label="Cancel"
                path=""
                className="px-1 text-sm text-white"
                onClick={() => {
                  setShowCancelDialog(true);
                }}
              />
            </div>

            <ButtonBox className="px-6" label={"Save"} onClick={onSave} disabled={isSaveDisabled} />
          </div>
        </div>
        <div className="relative flex w-full flex-1 gap-6">
          <Stepper model={stepperData} stepperLoader={false} />
          {!showConnectDataContainer ? (
            setUpProjectContainer()
          ) : (
            <PageConnectData
              dataSources={(sources: number) => {
                if (sources > 0) {
                  setIsSaveDisabled(false);
                } else if (sources === 0) {
                  setIsSaveDisabled(true);
                }
              }}
              projectInfo={projectInfo}
            />
          )}
        </div>
      </>
    ) : (
      <>{projectSuccessContainer()}</>
    );
  };

  return (
    <div className="flex h-full mx-auto w-full md:max-w-rightContent p-3 flex-col overflow-y-hidden ">
      {pageLoader ? showPageLoader() : createProjectMainContainer()}
      <ConfirmDialog
        showDialog={showCancelDialog}
        closeDialog={() => setShowCancelDialog(false)}
        headerText={"Cancel Project"}
        content={"Are you sure you want to cancel the project?"}
        primaryButtonText={"Yes, Cancel"}
        primaryButtonColor=""
        primaryButtonClick={() => onProjectCancel()}
        secondaryButtonText={"No, Stay on the page"}
      />
    </div>
  );
};

export default PageCreateProject;

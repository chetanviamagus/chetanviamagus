import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import logo1 from "asset/img/icons/kroger_icon.svg";
import logo10 from "asset/img/project/project_logo_10.svg";
import logo11 from "asset/img/project/project_logo_11.svg";
import logo12 from "asset/img/project/project_logo_12.svg";
import logo2 from "asset/img/project/project_logo_2.svg";
import logo3 from "asset/img/project/project_logo_3.svg";
import logo4 from "asset/img/project/project_logo_4.svg";
import logo5 from "asset/img/project/project_logo_5.svg";
import logo6 from "asset/img/project/project_logo_6.svg";
import logo7 from "asset/img/project/project_logo_7.svg";
import logo8 from "asset/img/project/project_logo_8.svg";
import logo9 from "asset/img/project/project_logo_9.svg";
import ButtonBox from "component/ButtonBox";
import CardAdd from "component/CardAdd";
import ConfirmDialog from "component/ConfirmDialog";
import DialogBox from "component/Dialog";
import FileUploadDemo from "component/FileUploadDemo";
import IconSelector from "component/IconSelector";
import InputBox from "component/InputBox";
import InputSearch from "component/InputSearch";
import InputTextArea from "component/InputTextArea";
import ProjectsCard from "component/ProjectsCard";
import Text from "component/Text";
import ToastCustom from "component/Toast";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { linkAuthRoute, linkProjectBase, linkProjectCreate } from "routes";
import { TOAST_VARIANT } from "util/Constant";
interface IProject {
  id: string;
  projectInfo: {
    projectName: string;
    projectIcon: string;
    projectDescription: string;
  };
}

const PageProjectList = () => {
  const navigate = useNavigate();
  const toastRef = useRef<any>("");
  const [projectsData, setProjectsData] = useState<IProject[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  //States for project edit
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [editProjectInfo, setEditProjectInfo] = useState<IProject | null>(null); //Project to be edited
  const [projectId, setProjectId] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [projectIcon, setProjectIcon] = useState<string>("");
  const [uploadMethod, setUploadMethod] = useState<"icon" | "file" | null>(null);

  //Get local storage content
  const getProjects = localStorage.getItem("projects");

  const gotoAddNew = () => {
    navigate(linkAuthRoute + linkProjectCreate);
  };

  useEffect(() => {
    if (getProjects) {
      const projects = JSON.parse(getProjects);
      setProjectsData(projects);
    }
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch("/src/data/data-store.json");
    //     const data = await response.json();
    //     setProjectsData(data.createProject.projects);
    //   } catch (error) {
    //     console.error("Error fetching projects data:", error);
    //   }
    // };
    // fetchData();
  }, [editProjectInfo]);

  useEffect(() => {
    if (showEditDialog) {
      setProjectId(editProjectInfo?.id || "");
      setProjectName(editProjectInfo?.projectInfo.projectName || "");
      setProjectDescription(editProjectInfo?.projectInfo.projectDescription || "");
      setProjectIcon(editProjectInfo?.projectInfo.projectIcon || "");
    }
  }, [showEditDialog]);

  useEffect(() => {
    if (errorMessage !== "") {
      toastRef.current.showFunction();
    }
  }, [errorMessage]);

  const handleSearch = (value: string) => {
    const getProjects = localStorage.getItem("projects");
    if (getProjects) {
      const projects = JSON.parse(getProjects);
      const filteredProjects = projects.filter((project: IProject) =>
        project.projectInfo.projectName.toLowerCase().includes(value.toLowerCase())
      );
      setProjectsData(filteredProjects);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "projectName") {
      setProjectName(value);
    } else if (name === "projectDescription") {
      setProjectDescription(value);
    }
  };

  const handleImageSelect = (image: string, method: "icon" | "file") => {
    setProjectIcon(image);
    setUploadMethod(method);
  };

  const onProjectEdit = (projectId: string) => {
    const editProject = projectsData.find((project) => project.id === projectId);
    setEditProjectInfo(editProject || null);
    setShowEditDialog(true);
  };

  const deleteProject = (projectId: string) => {
    const updatedProjects = projectsData.filter((project) => project.id !== projectId);
    setProjectsData(updatedProjects);
    setShowDeleteDialog(false);

    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  const onSaveEditedProject = () => {
    if (editProjectInfo) {
      const updatedProjects = projectsData.map((project) => {
        if (project.id === editProjectInfo.id) {
          return {
            ...project,
            projectInfo: {
              ...project.projectInfo,
              projectName: projectName,
              projectDescription: projectDescription,
              projectIcon: projectIcon,
            },
          };
        }
        return project;
      });

      setProjectsData(updatedProjects);
      setShowEditDialog(false);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
    }
  };

  const editProjectDialogContent = () => {
    return (
      <div className="relative flex w-full flex-col items-start">
        <div className="flex w-full justify-between pb-6.5">
          <div className="flex items-center">
            <button
              onClick={() => {
                setShowEditDialog(false);
              }}
              className="mr-1.5 rounded-full p-1.5 text-dark-neutral-gray-900 hover:bg-black"
            >
              {""}
              <ChevronLeftIcon className="h-6 w-6 " />
            </button>

            <Text className="text-heading-3 font-semibold text-base-white" label={"Edit project"} />
          </div>

          <div className="flex items-center gap-6">
            <ButtonBox
              label="Cancel"
              variant="no-border"
              onClick={() => setShowEditDialog(false)}
            />

            <ButtonBox label="Save" className="px-6" onClick={onSaveEditedProject} />
          </div>
        </div>

        <div
          className="flex w-full flex-col overflow-y-auto"
          style={{ height: "calc(100vh - 112px)" }}
        >
          <div className="w-96 pb-3">
            <InputBox
              name="projectName"
              label="Project Name"
              value={projectName}
              onChange={handleChange}
            />
          </div>

          <div className="w-101 pb-3">
            <InputTextArea
              label="Project details"
              className="!h-30 w-full bg-dark-neutral-gray-100"
              name="projectDescription"
              value={projectDescription}
              onChange={handleChange}
              autoResize
            />
          </div>

          <div className="flex w-full flex-col gap-3">
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
              imageUploaded={projectIcon && uploadMethod === "file"}
            />

            <div className="pl-46">or</div>

            <FileUploadDemo
              className="w-[388px]"
              onFileSelect={(files: any) => {
                if (files.length > 0) {
                  handleImageSelect(URL.createObjectURL(files[0]), "file");
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full mx-auto w-full md:max-w-rightContent p-3 flex-col gap-3">
      <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <Text className="text-heading-2 font-bold" label={"Projects"} />

        <div className="w-73.5">
          <InputSearch handleSearch={(value: string) => handleSearch(value)} />
        </div>
      </div>

      <div className="screen-bg h-full rounded-xl p-3">
        <div className="grid h-full w-full grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-5">
          <CardAdd label="Create New Project" onClick={gotoAddNew} />

          {projectsData.map((project: IProject, index) => {
            return (
              <div key={index}>
                <ProjectsCard
                  key={index}
                  projectId={project.id}
                  projectIcon={project.projectInfo.projectIcon}
                  projectName={project.projectInfo.projectName}
                  projectDescription={project.projectInfo.projectDescription}
                  onClick={() =>
                    navigate(linkAuthRoute + `${linkProjectBase}/${project.id ?? "uid"}/chat`)
                  }
                  // onDelete={() => setShowDeleteDialog(true)}
                  onDelete={() => {
                    setErrorMessage(
                      "Project has been moved to bin. It will automatically be deleted after 30days"
                    );
                    deleteProject(project.id);
                  }}
                  onEdit={() => onProjectEdit(project.id)}
                />

                <DialogBox
                  closable={false}
                  modal
                  visible={showEditDialog}
                  position="right"
                  className={`slide-dialog-modal h-screen w-full rounded-l-xl bg-base md:w-5/6 lg:w-3/5`}
                  onHide={() => setShowEditDialog(false)}
                >
                  {editProjectDialogContent()}
                </DialogBox>

                <ConfirmDialog
                  showDialog={showDeleteDialog}
                  closeDialog={() => setShowDeleteDialog(false)}
                  headerText={"Are you sure?"}
                  content={
                    "All chats and prompt templates in this project will be deleted. This action cannot be undone"
                  }
                  primaryButtonText={"Yes, Delete"}
                  primaryButtonColor=""
                  primaryButtonClick={() => deleteProject(project.id)}
                  secondaryButtonText={"No, Keep it"}
                />
              </div>
            );
          })}
        </div>

        <ToastCustom
          position="bottom-right"
          ref={toastRef}
          message={errorMessage}
          variant={TOAST_VARIANT.TERTIARY}
        />
      </div>
    </div>
  );
};

export default PageProjectList;

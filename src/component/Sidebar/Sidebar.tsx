import { IconFolderPlus, IconMistOff, IconPlus } from "@tabler/icons-react";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { CloseSidebarButton, OpenSidebarButton } from "./components/OpenCloseButton";

import Search from "../Search";
import ButtonBox from "component/ButtonBox/ButtonBox";
import InputBox from "component/InputBox/InputBox";
import SimpleDropDown from "component/SimpleDropDown/SimpleDropDown";

import projectIcon1 from "asset/img/project/project_logo_1.svg";
import projectIcon2 from "asset/img/project/project_logo_2.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getLocalStorage } from "util/CommonUtil";
import { LOCAL_STORAGE } from "util/Constant";
import { linkAuthRoute, linkProjectBase, linkProjectChat } from "routes";
import HomeContext from "util/api/home/home.context";
import { useAppDispatch, useAppSelector } from "hook/redux";
import { setSelectedProject } from "slice/ProjectSlice";

interface Props<T> {
  isOpen: boolean;
  addItemButtonTitle: string;
  side: "left" | "right";
  items: T[];
  itemComponent: ReactNode;
  folderComponent: ReactNode;
  footerComponent?: ReactNode;
  searchTerm: string;
  handleSearchTerm: (searchTerm: string) => void;
  toggleOpen: () => void;
  handleCreateItem: (projectUid?: string) => void;
  handleCreateFolder: () => void;
  handleDrop: (e: any) => void;
  isPrompt?: boolean;
}

const Sidebar = <T,>({
  isOpen,
  addItemButtonTitle,
  side,
  items,
  itemComponent,
  folderComponent,
  footerComponent,
  searchTerm,
  handleSearchTerm,
  toggleOpen,
  handleCreateItem,
  handleCreateFolder,
  handleDrop,
  isPrompt,
}: Props<T>) => {
  const {
    state: { selectedConversation },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const { t } = useTranslation("promptbar");

  const { uid: projectUid } = useParams<{ uid: string }>();

  const dispatch = useAppDispatch();
  const currentProject = useAppSelector((state) => state.project.selectedProject);

  const navigate = useNavigate();

  const allowDrop = (e: any) => {
    e.preventDefault();
  };

  const highlightDrop = (e: any) => {
    e.target.style.background = "#343541";
  };

  const removeHighlight = (e: any) => {
    e.target.style.background = "none";
  };

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const _options = JSON.parse(getLocalStorage(LOCAL_STORAGE.PROJECT_LIST) || "[]");
    if (_options.length > 0) {
      const temp = _options?.map((item: any) => {
        return {
          id: item.id,
          name: item?.projectInfo?.projectName ?? "",
          icon: item?.projectInfo?.projectIcon ?? null,
        };
      });
      setOptions(temp);
      const selectedProject = _options.find((item: any) => item.id === projectUid);
      dispatch(setSelectedProject(selectedProject ?? _options[_options.length - 1]));
    }
  }, []);

  return isOpen ? (
    <div>
      <div
        className={`fixed top-0 ${side}-0 z-40 flex h-full w-[260px] flex-none flex-col space-y-2 p-2 text-[14px] transition-all sm:relative sm:top-0`}
      >
        <div className="mb-6">
          <SimpleDropDown
            hideLabel
            hideErrorRow
            options={options}
            optionLabel="name"
            // optionValue="id"
            value={currentProject}
            onChange={(e: any) => {
              dispatch(setSelectedProject(e.value));
              homeDispatch({ field: "selectedConversation", value: undefined });
              navigate(
                linkAuthRoute + `${linkProjectBase}/${e.value?.id ?? "uid"}${linkProjectChat}`
              );
            }}
            dataKey="id"
            variant="secondary"
            itemTemplate={(option: any) => (
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full">
                  <img src={option.icon} alt="" />
                </div>
                <div>{option?.name}</div>
              </div>
            )}
            valueTemplate={(option: any) => (
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full">
                  <img src={option?.icon} alt="" />
                </div>
                <div>{option?.name}</div>
              </div>
            )}
          />
        </div>
        <div className=" flex items-center gap-3">
          {/* <button
            className="text-sidebar flex w-[190px] flex-shrink-0 cursor-pointer select-none items-center gap-3 rounded-md border border-white/20 p-3 text-white transition-colors duration-200 hover:bg-gray-500/10"
            onClick={() => {
              handleCreateItem();
              handleSearchTerm("");
            }}
          >
            <IconPlus size={16} />
            {addItemButtonTitle}
          </button> */}
          <ButtonBox
            label={addItemButtonTitle}
            onClick={() => {
              handleCreateItem(projectUid);
              handleSearchTerm("");
            }}
            iconImg={<IconPlus size={24} />}
            isIcon
          />
          {isPrompt ? null : (
            <ButtonBox
              color="blue"
              variant="icon"
              onClick={handleCreateFolder}
              buttonType="ADD_FOLDER"
            />
          )}
        </div>
        <Search
          placeholder={t("Search...") || ""}
          searchTerm={searchTerm}
          onSearch={handleSearchTerm}
        />

        <div className="flex-grow overflow-auto">
          <div className="mt-3 font-semibold">{isPrompt ? "Prompts" : "Chats"}</div>
          {!isPrompt && items?.length > 0 && (
            <div className="flex border-b border-white/10 pb-2">{folderComponent}</div>
          )}

          {items?.length > 0 ? (
            <div
              className="pt-2"
              onDrop={handleDrop}
              onDragOver={allowDrop}
              onDragEnter={highlightDrop}
              onDragLeave={removeHighlight}
            >
              {itemComponent}
            </div>
          ) : (
            <div className="mt-8 select-none text-center text-white opacity-50">
              <IconMistOff className="mx-auto mb-3" />
              <span className="text-[14px] leading-normal">{t("No data.")}</span>
            </div>
          )}
        </div>
        {footerComponent}
      </div>

      <CloseSidebarButton onClick={toggleOpen} side={side} />
    </div>
  ) : (
    <OpenSidebarButton onClick={toggleOpen} side={side} />
  );
};

export default Sidebar;

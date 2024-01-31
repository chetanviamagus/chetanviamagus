// React imports
import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// PrimeReact imports
import { Menu } from "primereact/menu";

// Heroicons imports
import {
  ChartPieIcon,
  ChatBubbleLeftEllipsisIcon,
  ChevronLeftIcon,
  CircleStackIcon,
  CommandLineIcon,
  CpuChipIcon,
  DocumentTextIcon,
  FolderOpenIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

// Local file imports
import dp from "asset/img/dp.png";
import logo from "asset/img/logos/logo.svg";
import {
  linkAuthRoute,
  linkChatBase,
  linkDashboardBase,
  linkDataSourceBase,
  linkDataSourceList,
  linkHomeBase,
  linkPageLogin,
  linkProjectBase,
  linkProjectChat,
  linkProjectCreate,
  linkProjectDashboard,
  linkProjectDatasource,
  linkProjectList,
  linkProjectPrompt,
  linkProjectReports,
  linkProjectTeams,
  linkPromptBase,
  linkReportsBase,
  linkTeamsBase,
} from "routes";

// Service imports
import AuthService from "service/AuthService";
import { useAppSelector } from "hook/redux";

interface IMenuItem {
  key: string;
  label: string;
  icon: React.ElementType;
  basePath: string;
  destinationRoute: string;
  subMenu?: IMenuItem[];
}

interface SideBarTabProps {
  // specify the type for the props here
  menuItem: IMenuItem;
  onTabAction: () => void;
}

function SideBarTab(props: Readonly<SideBarTabProps>) {
  const location = useLocation();
  const { menuItem, onTabAction } = props;
  const isActive = location?.pathname?.includes(menuItem.basePath);
  return (
    <Link
      onClick={onTabAction}
      to={menuItem.destinationRoute}
      className={`group w-full text-2xl dark:hover:text-dark-neutral-gray-900 ${
        isActive ? "dark:text-dark-neutral-gray-900" : "dark:text-dark-neutral-gray-600"
      }`}
    >
      <div
        className={`relative flex h-14.5 w-full cursor-pointer flex-col items-center justify-between rounded-xl py-1.5 ${
          isActive
            ? "bg-dark-neutral-gray-200 contrast-100 filter"
            : "dark:group-hover:bg-base-side-nav-hover dark:group-hover:backdrop-blur-2xl"
        }`}
      >
        {menuItem?.icon && (
          <menuItem.icon
            className={`group-text-dark-neutral-gray-600 h-6 w-6 dark:group-hover:text-dark-neutral-gray-900 ${
              isActive
                ? "group-bg-dark-neutral-gray-200 contrast-100 filter"
                : "dark:group-hover:bg-base-side-nav-hover dark:group-hover:backdrop-blur-2xl"
            }}`}
          />
        )}
        <div className="text-xxs">{menuItem?.label}</div>
      </div>
    </Link>
  );
}

const DefaultSidebar = () => {
  const currentProject = useAppSelector((state) => state.project.selectedProject);

  const MENU_ITEMS: IMenuItem[] = [
    {
      key: "HOME",
      label: "Home",
      icon: HomeIcon,
      basePath: linkHomeBase,
      destinationRoute: linkAuthRoute + linkHomeBase,
    },
    {
      key: "PROJECT",
      label: "Projects",
      icon: FolderOpenIcon,
      // basePath: linkProjectBase,
      // destinationRoute: linkAuthRoute + linkProjectList,
      basePath: linkProjectBase,
      destinationRoute: linkAuthRoute + linkProjectList,
      subMenu: [
        {
          key: "DASHBOARD",
          label: "Dashboard",
          icon: ChartPieIcon,
          basePath: linkDashboardBase,
          destinationRoute:
            linkAuthRoute + linkProjectBase + `/${currentProject?.id}` + linkDashboardBase,
        },
        {
          key: "PROMPT",
          label: "Prompt",
          icon: CommandLineIcon,
          basePath: linkProjectPrompt,
          destinationRoute:
            linkAuthRoute + linkProjectBase + `/${currentProject?.id}` + linkPromptBase,
        },
        {
          key: "CHAT",
          label: "Chat",
          icon: ChatBubbleLeftEllipsisIcon,
          basePath: linkProjectChat,
          destinationRoute:
            linkAuthRoute + linkProjectBase + `/${currentProject?.id}` + linkProjectChat,
        },
        {
          key: "DATA",
          label: "Resources",
          icon: CpuChipIcon,
          basePath: linkProjectDatasource,
          destinationRoute:
            linkAuthRoute + linkProjectBase + `/${currentProject?.id}` + linkProjectDatasource,
        },
        {
          key: "TEAMS",
          label: "Teams",
          icon: UsersIcon,
          basePath: linkTeamsBase,
          destinationRoute:
            linkAuthRoute + linkProjectBase + `/${currentProject?.id}` + linkTeamsBase,
        },
        {
          key: "REPORTS",
          label: "Reports",
          icon: DocumentTextIcon,
          basePath: linkReportsBase,
          destinationRoute:
            linkAuthRoute + linkProjectBase + `/${currentProject?.id}` + linkReportsBase,
        },
      ],
    },

    {
      key: "CHAT",
      label: "Chat",
      icon: ChatBubbleLeftEllipsisIcon,
      basePath: linkChatBase,
      destinationRoute:
        linkAuthRoute + linkProjectBase + `/${currentProject?.id}` + linkProjectChat,
    },
    {
      key: "DATASOURCE",
      label: "Resources",
      icon: CpuChipIcon,
      basePath: linkDataSourceBase,
      destinationRoute: linkAuthRoute + linkDataSourceList,
    },
  ];
  // State variables
  const [menu, setMenu] = useState(MENU_ITEMS);
  const [parentMenu, setParentMenu] = useState<IMenuItem | null>(null);

  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<Menu | null>(null);

  // Handle click on menu item
  const handleClick = (item: IMenuItem) => {
    // if (item.subMenu && !location.pathname?.includes(linkProjectBase)) {
    //   setParentMenu(item); // Set the parent menu when a submenu is selected
    //   setMenu(item.subMenu); // Set the submenu as the current menu
    // }
  };

  useEffect(() => {
    const _selectedModule = MENU_ITEMS?.find((item: any) =>
      location.pathname?.includes(item.basePath?.substring(0, item.basePath.length - 1))
    );

    const isRestricted = () => {
      const restricted = [linkProjectList, linkProjectCreate];
      let isRestricted = false;
      restricted.forEach((link: any) => {
        isRestricted = location.pathname?.includes(link) ? true : isRestricted;
      });

      return isRestricted;
    };
    if (_selectedModule?.subMenu && !isRestricted()) {
      setParentMenu(_selectedModule); // Set the parent menu when a submenu is selected
      setMenu(_selectedModule.subMenu); // Set the submenu as the current menu
    } else {
      setMenu(MENU_ITEMS);
      setParentMenu(null);
    }
  }, [location]);

  // Handle back action
  const handleBack = () => {
    navigate(linkAuthRoute + linkProjectList);
  };
  // Handle logout action
  const logOut = () => {
    // Keys you want to preserve
    const keysToPreserve = ["defaultLocale", "theme"];

    // Iterate through localStorage keys in reverse order
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && !keysToPreserve.includes(key)) {
        // Remove the key-value pair from localStorage
        localStorage.removeItem(key);
      }
    }

    AuthService.logOut();
    navigate(linkPageLogin);
  };

  // Show menu overlay
  const onShowMenuOverlay = (e: React.MouseEvent) => {
    menuRef?.current?.toggle?.(e);
  };

  // Clear chat data
  const clearChat = () => {
    localStorage.removeItem("selectedConversation");
    localStorage.removeItem("conversationHistory");
    localStorage.removeItem("folders");

    //refresh page
    window.location.reload();
  };

  // Clear prompt data
  const clearPrompt = () => {
    localStorage.removeItem("selectedPromptTemplate");
    localStorage.removeItem("promptConversationHistory");
    localStorage.removeItem("promptFolders");

    //refresh page
    window.location.reload();
  };

  // Clear project data
  const clearProjectData = () => {
    localStorage.removeItem("projectConversationHistory");
    localStorage.removeItem("projectConversation");
    localStorage.removeItem("projectChatMessages");
    window.location.reload(); // Refresh page
  };
  return (
    <div className="flex h-full flex-col items-center gap-y-6">
      {!parentMenu && (
        <Link to={linkAuthRoute + linkHomeBase}>
          <img src={logo} alt="logo" className="h-9" />
        </Link>
      )}

      <div className="flex w-17.5 flex-col items-center justify-center gap-y-3">
        {parentMenu && (
          <button onClick={handleBack} className="flex h-9 cursor-pointer flex-col items-center">
            <ChevronLeftIcon className="h-6 w-6 text-primary-electron-blue-700" />
            <div className="text-xxs text-primary-electron-blue-700">{parentMenu.label}</div>
          </button>
        )}
        {menu?.map((item: IMenuItem) => {
          return (
            <Fragment key={item.key}>
              <SideBarTab key={item.key} menuItem={item} onTabAction={() => handleClick(item)} />
            </Fragment>
          );
        })}
      </div>
      <button
        onClick={onShowMenuOverlay}
        className="mt-auto flex w-17.5 flex-col items-center gap-y-3"
      >
        <img src={dp} alt="profile-icon" className="cursor-pointer rounded-full" />
        <Menu
          model={[
            {
              label: "Clear Sessions",
              command: clearChat,
            },
            {
              label: "Clear Prompt Templates",
              command: clearPrompt,
            },
            {
              label: "Clear Project Data",
              command: clearProjectData,
            },
            {
              label: "Logout",
              command: logOut,
            },
          ]}
          popup
          ref={menuRef}
          id={"profile-s"}
        />
      </button>
    </div>
  );
};

export default DefaultSidebar;

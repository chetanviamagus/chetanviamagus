import Text from "component/Text/Text";
import krogerIcon from "asset/img/icons/kroger_icon.svg";
import CustomAvatarGroup from "component/AvatarGroup/CustomAvatarGroup";
import { useNavigate } from "react-router-dom";
import { linkAuthRoute, linkProjectBase, linkProjectChat } from "routes";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Menu } from "primereact/menu";
import { useRef } from "react";

interface ProjectsCardProps {
  projectId?: string;
  projectIcon?: string;
  projectName?: string;
  projectDescription?: string;
  team?: { avatar: string }[];
  onDelete?: () => void;
  onEdit?: () => void;
  onClick?: () => void;
}

const ProjectsCard = (props: ProjectsCardProps) => {
  const { projectId, projectIcon, projectName, projectDescription, onDelete, onEdit, onClick } =
    props;
  const navigate = useNavigate();

  const menuRef = useRef<any>();

  const onShowMenuOverlay = (e: any) => {
    menuRef?.current?.toggle?.(e);
  };

  return (
    <div className="relative">
      <div className="absolute right-6 top-6 z-10 p-1" onClick={onShowMenuOverlay}>
        <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer text-dark-neutral-gray-600 hover:text-dark-neutral-gray-900" />
      </div>
      <Menu
        // {...props}
        className="w-30"
        model={[
          {
            label: "Delete",
            command: onDelete,
          },
          {
            label: "Edit",
            command: onEdit,
          },
        ]}
        popup
        ref={menuRef}
        id={projectId}
      />
      <div
        className="relative flex h-51 w-full cursor-pointer flex-col items-center justify-center rounded-md bg-base p-6"
        onClick={onClick}
      >
        <div className="flex h-18 w-18 items-center p-2.5 pb-4.5">
          <img src={projectIcon} alt="kroger_icon" />
        </div>

        <div className="pb-2.5 text-xs font-bold text-dark-neutral-gray-900">
          <Text label={projectName} />
        </div>

        <div className="h-8.5 w-full truncate pb-2.5 text-center text-body-copy-2 text-dark-neutral-gray-700">
          <Text label={projectDescription} />
        </div>

        <div className="flex items-center gap-1.5 text-body-copy-2 text-dark-neutral-gray-700">
          <CustomAvatarGroup />
          <Text label={"+7 more"} />
        </div>
      </div>
    </div>
  );
};

export default ProjectsCard;

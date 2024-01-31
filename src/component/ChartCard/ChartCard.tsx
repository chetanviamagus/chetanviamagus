import { EllipsisVerticalIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Text from "component/Text/Text";
import { Menu } from "primereact/menu";
import React, { useRef } from "react";

interface IChartCardProps {
  variant?: "default" | "secondary";
  title: string;
  subtitle?: string;
  graph: React.ReactNode;
  menuModel?: any[];
}

const ChartCard = (props: IChartCardProps) => {
  const { title, subtitle, graph, menuModel } = props;
  const menuRef = useRef<any>();
  const onShowMenuOverlay = (e: any) => {
    menuRef?.current?.toggle?.(e);
  };
  return (
    <div className="flex h-79.5 w-full flex-col justify-between rounded-md bg-dark-assistant-chat-gradient p-6">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="text-sm font-semibold text-dark-neutral-gray-900">
            <Text label={title} />
          </div>

          <div className="text-xxs leading-none text-dark-neutral-gray-600">
            <Text label={subtitle} />
          </div>
        </div>

        <div className="flex gap-3">
          <SparklesIcon className="h-6 w-6 text-dark-neutral-gray-600 hover:text-dark-neutral-gray-900" />

          <div onClick={onShowMenuOverlay}>
            <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer text-dark-neutral-gray-600 hover:text-dark-neutral-gray-900" />
          </div>

          <Menu
            // {...props}
            className="w-30"
            model={[
              {
                label: "Go to chat",
                // command: onGotoChat,
              },
              {
                label: "Download",
                // command: onDownload,
              },
              {
                label: "Share",
                // command: onShare,
              },
              {
                label: "Delete",
                // command: onDelete,
              },
            ]}
            popup
            ref={menuRef}
            id={""}
          />
        </div>
      </div>

      <div className="flex justify-center">{graph}</div>
    </div>
  );
};

export default ChartCard;

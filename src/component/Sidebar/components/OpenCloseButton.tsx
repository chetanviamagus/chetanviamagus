import { IconArrowBarLeft, IconArrowBarRight } from "@tabler/icons-react";

interface Props {
  onClick: any;
  side: "left" | "right";
}

export const CloseSidebarButton = ({ onClick, side }: Props) => {
  return (
    <>
      <button
        className={`absolute top-5 ${
          side === "right" ? "right-[300px]" : "left-[300px]"
        } z-50 h-7 w-7 hover:text-gray-400 dark:text-white dark:hover:text-gray-300 sm:top-5 sm:${
          side === "right" ? "right-[300px]" : "left-[300px]"
        } sm:h-8 sm:w-8 sm:text-neutral-700`}
        onClick={onClick}
      >
        {side === "right" ? <IconArrowBarRight /> : <IconArrowBarLeft />}
      </button>
      <div
        onClick={onClick}
        className="absolute left-0 top-0 z-10 h-full w-full bg-black opacity-70 sm:hidden"
      ></div>
    </>
  );
};

export const OpenSidebarButton = ({ onClick, side }: Props) => {
  return (
    <button
      className={`absolute top-5 ${
        side === "right" ? "right-8" : "left-8"
      } z-50 h-7 w-7 text-white hover:text-gray-400 dark:text-white dark:hover:text-gray-300 sm:top-5 sm:${
        side === "right" ? "right-4" : "left-4"
      } sm:h-8 sm:w-8 sm:text-neutral-700`}
      onClick={onClick}
    >
      {side === "right" ? <IconArrowBarLeft /> : <IconArrowBarRight />}
    </button>
  );
};

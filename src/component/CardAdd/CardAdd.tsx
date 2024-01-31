import React, { useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Text from "component/Text/Text";

function CardAdd(props: any) {
  const { onClick, label, heightClass } = props;

  useEffect(() => {
    const container = document.getElementById("add-card");

    const handleMouseMove = (e: any) => {
      if (container) {
        const mouseX = e.clientX - container.getBoundingClientRect().left;
        const mouseY = e.clientY - container.getBoundingClientRect().top;

        const percentageX = (mouseX / container.clientWidth) * 100;
        const percentageY = (mouseY / container.clientHeight) * 100;

        container.style.background = `radial-gradient(
          circle at ${percentageX}% ${percentageY}%,
          #24344d 15.88%,
          #11161e 100%
        )`;
      }
    };

    const handleMouseLeave = () => {
      if (container) {
        //Get back to default background
        container.style.background = "";
      }
    };

    container?.addEventListener?.("mousemove", handleMouseMove);
    container?.addEventListener?.("mouseleave", handleMouseLeave);

    return () => {
      container?.removeEventListener?.("mousemove", handleMouseMove);
      container?.removeEventListener?.("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`text-dark-neutral-gray-600 hover:text-dark-neutral-gray-900 group flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-md bg-base p-6 ${
        heightClass ?? "h-51"
      }`}
      onClick={onClick}
      id="add-card"
    >
      <span className="group-hover:border-dark-neutral-gray-400 rounded-full border border-transparent  p-3.5 backdrop-blur-sm group-hover:bg-primary-electron-blue-500 group-hover:text-primary-electron-blue-300">
        <PlusIcon className="h-10 w-10" />
      </span>
      <Text className=" pointer-events-none text-body-copy-2" label={label} />
    </div>
  );
}

export default CardAdd;

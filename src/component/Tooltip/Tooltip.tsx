import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Badge } from "primereact/badge";
import { Tooltip } from "primereact/tooltip";
import React, { useState } from "react";
type TooltipPositionType = "top" | "bottom" | "left" | "right" | "mouse";
interface CustomTooltipProps {
  variant?: "default" | "secondary";
  message: any;
  classNames?: string;
  className?: string;
  iconClassName?: string;
  position?: TooltipPositionType;
  mouseTrack?: boolean;
  mouseTrackLeft?: number;
  mouseTrackTop?: number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = (props) => {
  const {
    message,
    className,
    classNames,
    iconClassName = null,
    position,
    mouseTrack,
    mouseTrackLeft,
    mouseTrackTop,
  } = props;

  // Generate a unique ID for each tooltip target
  const [targetId] = useState(() => `custom-target-${Math.random().toString(36).substr(2, 9)}`);

  return (
    <div className={`text-center ${classNames}`}>
      <Tooltip
        className={`max-w-65 rounded-sm bg-base-white p-3 text-xs text-neutral-900 ${className ?? ""}`}
        target={`#${targetId}`}
        position={position ?? "right"}
        mouseTrack={mouseTrack}
        mouseTrackLeft={mouseTrackLeft}
        mouseTrackTop={mouseTrackTop}
      >
        {message}
      </Tooltip>

      <InformationCircleIcon
        id={targetId}
        className={`h-4.23 w-4.23 cursor-pointer text-xl opacity-50 ${iconClassName}`}
      />
      {/* <Badge severity="danger"></Badge> */}
    </div>
  );
};

export default CustomTooltip;

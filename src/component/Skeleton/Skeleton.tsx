import { Skeleton, SkeletonProps } from "primereact/skeleton";
import React from "react";

const SkeletonCustom: React.FC<SkeletonProps> = (props: SkeletonProps) => {
  const { className, shape, size, width, height, borderRadius, animation } = props;

  return (
    <div className="group grid">
      <Skeleton
        className={className}
        shape={shape}
        size={size}
        width={width}
        height={height}
        borderRadius={borderRadius}
        animation={animation}
      />
    </div>
  );
};

export default SkeletonCustom;

export const SkeletonIconText = (props: any) => {
  return (
    <>
      <div className="flex w-full gap-6">
        <SkeletonCustom shape="circle" className="!h-6 !w-6" />
        <SkeletonCustom className="!h-6" borderRadius="6px" />
      </div>
    </>
  );
};

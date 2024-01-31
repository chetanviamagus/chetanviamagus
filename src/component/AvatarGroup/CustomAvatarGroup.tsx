import React from "react";
import { Avatar, AvatarSizeType } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup";
import Avatar1 from "asset/img/project/avatar_1.png";
import Avatar2 from "asset/img/project/avatar_2.png";
import Avatar3 from "asset/img/project/avatar_3.png";

interface AvatarProps {
  imageUrl?: string;
  size?: string;
}

const CustomAvatarGroup: React.FC<AvatarProps> = ({ size = "large" }) => {
  return (
    <AvatarGroup className="gap-1.5">
      <Avatar shape="circle" image={Avatar1} size={size as AvatarSizeType} imageAlt="avatar" />
      <Avatar shape="circle" image={Avatar2} size={size as AvatarSizeType} imageAlt="avatar" />
      <Avatar shape="circle" image={Avatar3} size={size as AvatarSizeType} imageAlt="avatar" />
    </AvatarGroup>
  );
};

export default CustomAvatarGroup;

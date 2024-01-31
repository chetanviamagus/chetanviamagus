import SimpleDropDown from "component/SimpleDropDown/SimpleDropDown";
import Text from "component/Text/Text";
import { useState } from "react";

interface ITeamCardProps {
  variant?: "default" | "secondary";
  profilePicture?: string;
  name: string;
  email: string;
  tenantType: string;
}

const TeamCard = (props: ITeamCardProps) => {
  const { profilePicture, name, email, tenantType } = props;
  const [options, setOptions] = useState([
    { value: "owner", name: "Owner" },
    { value: "user", name: "User" },
  ]);

  return (
    <div className="flex w-full cursor-pointer items-center justify-between rounded-md py-1.5">
      <div className="flex gap-1.5">
        <div className="h-9 w-9 rounded-full">
          <img
            src={profilePicture}
            alt="Profile pic"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="text-sm font-semibold leading-none text-dark-text-main">
            <Text label={name} />
          </div>

          <div className="text-sm leading-none text-dark-neutral-gray-800">
            <Text label={email} />
          </div>
        </div>
      </div>

      <SimpleDropDown
        hideLabel
        hideErrorRow
        options={options}
        optionLabel="name"
        // optionValue="id"
        className="!w-20"
        value={tenantType}
        onChange={(e: any) => {
          console.log(e);
        }}
        dataKey="id"
        variant="secondary"
        itemTemplate={(option: any) => (
          <div className="flex items-center gap-3">
            <div>{option?.name}</div>
          </div>
        )}
        valueTemplate={(option: any) => (
          <div className="flex items-center gap-3">
            <div>{option?.name}</div>
          </div>
        )}
      />
    </div>
  );
};

export default TeamCard;

import React from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Text from "component/Text/Text";
import ButtonBox from "component/ButtonBox/ButtonBox";

function CardConnect(props: any) {
  const { logo, label, onConnect } = props;

  return (
    <div className="flex max-h-52 w-full flex-col items-center justify-between gap-6 rounded-md bg-base p-6">
      <div className="flex flex-1 flex-col items-center justify-between gap-2.5">
        {logo ? (
          <div className="flex h-18 flex-1 items-center justify-between p-2.5">
            <img src={logo} alt="logo" className="max-h-9" />
          </div>
        ) : null}
        <Text className="text-center text-body-copy-2 font-semibold" label={label} />
      </div>
      <div className="w-full">
        <ButtonBox label="Connect" variant="secondary" onClick={onConnect} />
      </div>
    </div>
  );
}

export default CardConnect;

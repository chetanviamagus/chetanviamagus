import React, { useRef } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Text from "component/Text/Text";
import ButtonBox from "component/ButtonBox/ButtonBox";
import { Menu } from "primereact/menu";
import { LOCAL_STORAGE } from "util/Constant";
import { DATASOURCE_ASSETS, DATASOURCE_KEYS } from "util/DataSourceConstant";

function CardView(props: any) {
  const { datasourceDetails, onView, setList } = props;

  const menuRef = useRef<any>();

  const onShowMenuOverlay = (e: any) => {
    menuRef?.current?.toggle?.(e);
  };

  const deleteItem = () => {
    let datasourceArray: any[] = localStorage.getItem(LOCAL_STORAGE.DATASOURCE_LIST)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.DATASOURCE_LIST) || "")
      : [];

    //Delete object from the array
    datasourceArray = datasourceArray.filter(
      (datasource: any) => datasource.uid !== datasourceDetails.uid
    );
    setList(
      datasourceArray?.map((datasource: any) => {
        return {
          ...datasource,
          assets: DATASOURCE_ASSETS[datasource.key as DATASOURCE_KEYS],
        };
      })
    );
    localStorage.setItem(LOCAL_STORAGE.DATASOURCE_LIST, JSON.stringify(datasourceArray));
  };

  return (
    <div className="relative flex h-66 flex-col items-center justify-center rounded-xl bg-base p-6">
      <div className="absolute right-6 top-6" onClick={onShowMenuOverlay}>
        <EllipsisVerticalIcon className=" h-6 w-6 cursor-pointer text-dark-neutral-gray-600 hover:text-dark-neutral-gray-900" />
      </div>
      <Menu
        {...props}
        model={[
          {
            label: "Delete",
            command: deleteItem,
          },
        ]}
        popup
        ref={menuRef}
        id={datasourceDetails.uid}
      />
      {datasourceDetails?.assets?.logo ? (
        <img src={datasourceDetails?.assets?.logo} alt="logo" className="max-h-9" />
      ) : null}
      <Text
        className="mt-6 text-center text-body-copy-2 font-semibold"
        label={datasourceDetails?.username ?? ""}
      />

      <Text
        className=" mt-3 text-center text-body-copy-2 text-dark-neutral-gray-700"
        label={`Acc. No: ${datasourceDetails?.accountNo ?? ""}`}
      />

      <Text
        className="mt-3 text-center text-body-copy-2 text-dark-neutral-gray-700"
        label={`${datasourceDetails?.datasourceCount ?? 0} data sources`}
      />
      <div className="mt-6 w-full">
        <ButtonBox label="View" variant="secondary" onClick={onView} />
      </div>
    </div>
  );
}

export default CardView;

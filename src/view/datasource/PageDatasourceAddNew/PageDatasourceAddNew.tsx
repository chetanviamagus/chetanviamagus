import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import ButtonBox from "component/ButtonBox/ButtonBox";
import CardConnect from "component/CardConnect/CardConnect";
import Text from "component/Text/Text";
import { useNavigate } from "react-router-dom";
import { linkAuthRoute, linkDataSourceCreate, linkDataSourceList } from "routes";
import { DATASOURCE_ASSETS, DATASOURCE_KEYS } from "util/DataSourceConstant";

function PageDatasourceAddNew() {
  const navigate = useNavigate();
  //Generate array of object for each datasource from the DATASOURCE_ASSETS object
  const datasourceList = Object.keys(DATASOURCE_ASSETS).map((key: string) => {
    return {
      key: key,
      logo: DATASOURCE_ASSETS[key as DATASOURCE_KEYS].logo,
      label: DATASOURCE_ASSETS[key as DATASOURCE_KEYS].name,
      onConnect: () => {
        navigate(linkAuthRoute + linkDataSourceCreate + "/" + key);
      },
    };
  });

  const goBack = () => {
    navigate(linkAuthRoute + linkDataSourceList);
  };

  return (
    <div className="h-full mx-auto w-full md:max-w-rightContent p-3">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-x-3">
          <div
            className="cursor-pointer rounded-full p-1.5 hover:bg-neutral-200/10"
            onClick={goBack}
          >
            <ArrowLeftIcon className="w-6 " />
          </div>
          <Text className="text-heading-2 font-bold" label={"Connect New Account"} />
        </div>
        <div className="">
          <ButtonBox label="Service provider not listed" variant="no-border" />
        </div>
      </div>

      <div className="screen-bg w-full rounded-4.5 p-3">
        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
          // style={{ maxHeight: "calc(100vh - 96px)" }}
        >
          {
            //Loop through datasourceList and generate CardConnect
            datasourceList.map((datasource) => {
              return (
                <CardConnect
                  logo={datasource.logo}
                  label={datasource.label}
                  onConnect={datasource.onConnect}
                  key={datasource.key}
                />
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default PageDatasourceAddNew;

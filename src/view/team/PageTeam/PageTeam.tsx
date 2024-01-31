import SimpleDropDown from "component/SimpleDropDown/SimpleDropDown";
import Text from "component/Text/Text";
import { useAppDispatch, useAppSelector } from "hook/redux";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { linkAuthRoute, linkProjectBase, linkProjectChat } from "routes";
import { setSelectedProject } from "slice/ProjectSlice";
import { getLocalStorage } from "util/CommonUtil";
import { LOCAL_STORAGE } from "util/Constant";
import person1 from "asset/img/team/person1.png";
import person2 from "asset/img/team/person2.png";
import person3 from "asset/img/team/person3.png";
import person4 from "asset/img/team/person4.png";
import person5 from "asset/img/team/person5.png";
import person6 from "asset/img/team/person6.png";
import person7 from "asset/img/team/person7.png";
import HomeContext from "util/api/home/home.context";
import ChatBotInput from "component/ChatBotInput/ChatBotInput";
import TeamCard from "component/TeamCard/TeamCard";

const teamData = [
  { id: "1", profilePicture: person1, name: "John", email: "email", tenantType: "owner" },
  { id: "2", profilePicture: person2, name: "Peter", email: "email", tenantType: "user" },
  { id: "3", profilePicture: person3, name: "Tom", email: "email", tenantType: "user" },
  { id: "4", profilePicture: person4, name: "Robert", email: "email", tenantType: "user" },
  { id: "5", profilePicture: person5, name: "Sam", email: "email", tenantType: "user" },
  { id: "6", profilePicture: person6, name: "Chris", email: "email", tenantType: "user" },
  { id: "7", profilePicture: person7, name: "Peter", email: "email", tenantType: "user" },
];

const PageTeam = () => {
  const [options, setOptions] = useState([]);

  const { uid: projectUid } = useParams<{ uid: string }>();

  const navigate = useNavigate();

  // const {
  //   state: { selectedConversation },
  //   dispatch: homeDispatch,
  // } = useContext(HomeContext);

  const dispatch = useAppDispatch();
  const currentProject = useAppSelector((state) => state.project.selectedProject);

  useEffect(() => {
    const _options = JSON.parse(getLocalStorage(LOCAL_STORAGE.PROJECT_LIST) || "[]");
    if (_options.length > 0) {
      const temp = _options?.map((item: any) => {
        return {
          id: item.id,
          name: item?.projectInfo?.projectName ?? "",
          icon: item?.projectInfo?.projectIcon ?? null,
        };
      });
      setOptions(temp);
      const selectedProject = _options.find((item: any) => item.id === projectUid);
      dispatch(setSelectedProject(selectedProject ?? _options[_options.length - 1]));
    }
  }, []);

  const handleSend = (value: string) => {
    console.log(value);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-6 flex flex-col items-center gap-3 px-3 pt-3 sm:flex-row sm:justify-between">
        <Text label={"Team"} className="text-2xl font-semibold text-dark-text-main" />

        <SimpleDropDown
          hideLabel
          hideErrorRow
          options={options}
          optionLabel="name"
          // optionValue="id"
          value={currentProject}
          onChange={(e: any) => {
            dispatch(setSelectedProject(e.value));
            // homeDispatch({ field: "selectedConversation", value: undefined });
            navigate(
              linkAuthRoute + `${linkProjectBase}/${e.value?.id ?? "uid"}${linkProjectChat}`
            );
          }}
          dataKey="id"
          variant="secondary"
          itemTemplate={(option: any) => (
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full">
                <img src={option.icon} alt="" />
              </div>
              <div>{option?.name}</div>
            </div>
          )}
          valueTemplate={(option: any) => (
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full">
                <img src={option?.icon} alt="" />
              </div>
              <div>{option?.name}</div>
            </div>
          )}
        />
      </div>

      <div className="screen-bg flex h-full w-full flex-col gap-3 rounded-md py-6">
        <div className="flex w-full flex-col px-60">
          <div className="mb-3">
            <ChatBotInput placeholder="Filter" handleSend={(text: string) => handleSend(text)} />
          </div>

          <Text
            label={"Team members"}
            className="mb-6 text-sm font-semibold leading-none text-dark-text-main"
          />

          <div className="flex flex-col gap-3">
            {teamData.map((indInfo: any) => {
              return (
                <div key={indInfo.id}>
                  <TeamCard
                    profilePicture={indInfo.profilePicture}
                    name={indInfo.name}
                    email={indInfo.email}
                    tenantType={indInfo.tenantType}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTeam;

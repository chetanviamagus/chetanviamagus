import { AnimateTyping } from "component/AnimateTyping/AnimateTyping";
import ButtonBox from "component/ButtonBox/ButtonBox";
import Text from "component/Text/Text";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { linkAuthRoute, linkDataSourceBase, linkDataSourceList } from "routes";

const PageHome = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState<boolean>(false);
  const gotoDataSourceListPage = () => {
    navigate(linkAuthRoute + linkDataSourceList);
  };

  return (
    <div className="screen-bg mx-auto flex h-full w-full items-center justify-center overflow-hidden rounded-xl p-3 md:max-w-rightContent">
      <div className="mx-auto flex w-106 flex-col items-center">
        <Text className="text-center text-2xl font-semibold" label={`Welcome to NeuBird!`} />
        <div className="my-9 h-21 w-full text-center">
          <AnimateTyping
            delay={180}
            wordJump={5}
            className="text-body-copy-2 text-dark-neutral-gray-800"
            onTypingComplete={() => setShowButton(true)}
          >
            {
              "I'm Hawkeye, your expert data analyst. Before we get started please provide me with read-access to your data sources by clicking on the button below."
            }
          </AnimateTyping>
        </div>

        <div className="h-9 max-w-fit">
          {showButton ? (
            <ButtonBox
              className="px-6"
              label="Connect Resources"
              onClick={gotoDataSourceListPage}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PageHome;

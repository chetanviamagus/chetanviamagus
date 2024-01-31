import ButtonBox from "component/ButtonBox/ButtonBox";
import React from "react";
import { useNavigate } from "react-router-dom";
import { linkAuthRoute, linkPageView1 } from "routes";
const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className="page-404 mx-auto w-full md:max-w-rightContent p-3 h-screen flex flex-col gap-6 justify-center items-center ">
      <h1 className="text-4xl font-medium text-neutral-100">404</h1>
      <h2 className="text-sm text-neutral-200">Sorry! Page Not Found</h2>
      <div className="flex items-center justify-center">
        <ButtonBox
          onClick={() => navigate(`${linkAuthRoute}${linkPageView1}`)}
          label="Go To Home"
          className="px-9"
        />
      </div>
    </div>
  );
};

export default Page404;

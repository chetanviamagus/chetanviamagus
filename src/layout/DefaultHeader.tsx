import dp from "asset/img/dp.png";
import bellIcon from "asset/img/icons/bell.svg";
import changeProjectIcon from "asset/img/icons/change-project.svg";
import logo from "asset/img/logos/logo.svg";
import { linkChatBase } from "routes";

function DefaultHeader(props: any) {
  return (
    <div className="flex h-15 w-full flex-row items-center justify-between">
      <div className="flex h-full items-center">
        <div className="">
          <img src={logo} alt="logo" className="px-6 pb-1 pr-9 pt-2" />
        </div>
      </div>
      <div className="fixed left-1/2 top-4.5 -translate-x-1/2 transform">
        {location.pathname.includes(linkChatBase) ? (
          <div className="flex items-center gap-1.5">
            <div className="text-white">Project Name</div>
            <img src={changeProjectIcon} alt="" />
          </div>
        ) : null}
      </div>

      <div className="mr-6 flex items-center gap-x-6">
        <img src={bellIcon} alt="bell" className="cursor-pointer" />
        <img src={dp} alt="bell" className="cursor-pointer rounded-full" />
      </div>
    </div>
  );
}

export default DefaultHeader;

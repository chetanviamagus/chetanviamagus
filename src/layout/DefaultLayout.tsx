import { RouteProps, withRouter } from "hoc/withRouter";
import { IRouteObj } from "interface/common";
import { Suspense, useEffect, useState } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import routes, { linkChatBase } from "routes";
import AuthValidator from "../component/AuthValidator/AuthValidator";
import Loader from "../component/Loader/Loader";
import DefaultSidebar from "./DefaultSidebar";

type IProps = Readonly<RouteProps>; // Mark the props as read-only

function DefaultLayout(props: IProps) {
  const location = useLocation();

  const [isHideSidebar, setHideSidebar] = useState(false);

  const isChatPage = location.pathname.includes(linkChatBase);

  //the function below should apply for the entire screen and not only for the visible area

  useEffect(() => {
    const container = document.getElementById("container");

    //Hide side bar for project
    // setHideSidebar(location.pathname.includes(linkProjectCreate));

    const handleMouseMove = (e: any) => {
      if (container) {
        const mouseX = e.pageX - container.getBoundingClientRect().left;
        const mouseY = e.pageY - container.getBoundingClientRect().top;

        const percentageX = (mouseX / container.clientWidth) * 100;
        const percentageY = (mouseY / container.clientHeight) * 100;

        container.style.background = `radial-gradient(
          circle at ${percentageX}% ${percentageY}%,
          #24344d 15.88%,
          #11161e 100%
        )`;
      }
    };
    container?.addEventListener?.("mousemove", handleMouseMove);

    return () => {
      container?.removeEventListener?.("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      // id="container"
      className={
        "relative z-0 flex h-full w-full flex-col bg-white text-white dark:bg-[#12171F] dark:text-white"
      }
    >
      {/* <DefaultHeader /> */}
      <div className="flex h-full">
        {!isHideSidebar && (
          <div className="w-20.5 bg-base-side-nav py-6">
            <DefaultSidebar />
          </div>
        )}
        <div className="h-full flex-1 bg-base">
          <main className={`h-full flex-1 overflow-auto`}>
            <Suspense fallback={<Loader />}>
              <Routes>
                {routes.map((route: IRouteObj, idx: number) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      element={
                        <AuthValidator
                          AuthorizedComponent={route.component}
                          urlPath={route.path}
                          props={route?.props}
                        />
                      }
                    />
                  ) : null;
                })}
                <Route path="*" />
              </Routes>
            </Suspense>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default withRouter(DefaultLayout, true);

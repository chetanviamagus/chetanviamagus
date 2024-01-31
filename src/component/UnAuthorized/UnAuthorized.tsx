import * as routes from "routes";

function UnAuthorized(props: any) {
  return (
    <div className="h-9 flex flex-row bg-primary-red-1000 opacity-95 text-xs text-white items-center justify-center ">
      Your session has expired. Please
      <a href={routes.linkBasePath} className="mx-1 underline">
        Login
      </a>
      again
    </div>
  );
}

export default UnAuthorized;

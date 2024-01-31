import Text from "component/Text/Text";
import React, { memo } from "react";
import { IInputErrorProps } from "component/interface/Input";
import { COMMON_ERROR_STYLE } from "asset/base-theme";
import { generateClasses } from "util/Util";

// const errorIcon = () => {
//   try {
//     if (typeof require === undefined) return false;
//     return require("../../asset/img/error-icon.png");
//   } catch (err) {
//     return false;
//   }
// };

const InputError: React.FC<IInputErrorProps> = (props: IInputErrorProps) => {
  const { errorClassNames, errorStyleObj, hideErrorRow, validation } = props;
  const getClassNames = () => {
    const styleOBJECT = {
      primaryStyle: COMMON_ERROR_STYLE,
      overrideStyle: errorStyleObj,
      overrideClasses: errorClassNames,
    };

    return generateClasses(styleOBJECT);
  };
  return (
    <React.Fragment>
      {hideErrorRow ? (
        <></>
      ) : validation ? (
        <div className={`flex h-4 flex-row items-center text-body-copy-2 ${getClassNames()}`}>
          {/* {errorIcon() ? (
            <img src={errorIcon()} className=" pi-info-circle mx-2 h-3 w-3" alt="icon" />
          ) : (
            <i
              className="pi pi-info-circle pi-info-circle mx-2 h-2 w-2"
              style={{ marginBottom: "5px" }}
            />
          )} */}
          <div className={`truncate text-left leading-tight`}>
            <Text label={validation} className={`leading-4`} />
          </div>
        </div>
      ) : (
        <div className="mt-1 h-4 truncate text-left text-body-copy-2 leading-tight" />
      )}
    </React.Fragment>
  );
};

export default memo(InputError);

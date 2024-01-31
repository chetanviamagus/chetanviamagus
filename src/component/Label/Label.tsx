import { LABEL_STYLES } from "asset/base-theme";
import Text from "component/Text";
import { generateClasses } from "util/Util";
import { memo } from "react";

const Label = (props: any) => {
  const {
    label,
    hideLabel,
    labelClassNames,
    labelStyleObj,
    disabled,
    variant,
    isInvalid,
    mandatory,
  } = props;
  const getClassNames = () => {
    const styleObject = {
      ...LABEL_STYLES,
      overrideStyle: labelStyleObj,
      overrideClasses: labelClassNames,
      isInvalid: isInvalid,
      isDisabled: disabled,
    };

    return generateClasses(styleObject, variant);
  };
  return (
    <>
      {label ? (
        <>
          <Text className={`${getClassNames()} mb-1`} label={label} />
          {mandatory && <span className="-translate-y-1">*</span>}
        </>
      ) : hideLabel ? (
        <></>
      ) : (
        <div className={`mb-1 h-4 `} />
      )}
    </>
  );
};

export default memo(Label);

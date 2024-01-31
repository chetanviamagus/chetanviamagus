// Stepper.tsx
import { SkeletonIconText } from "component/Skeleton/Skeleton";
import { STEP_STATUS } from "util/Constant";
import check from "asset/img/icons/check_icon.svg";
import Text from "component/Text/Text";
import { IStepperModel } from "interface/component";

interface IStepperProps {
  model: IStepperModel[];
  stepperLoader: boolean;
}

const getIconState = (state?: string) => {
  if (state === STEP_STATUS.COMPLETED) {
    return (
      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-primary-electron-blue-700 p-0.752">
        <img className="" src={check} alt="Done icon" />
      </div>
    );
  } else if (state === STEP_STATUS.ACTIVE) {
    return (
      <div className="relative box-content flex h-3 w-3 items-center justify-center rounded-full border-6 border-primary-electron-blue-300 bg-primary-electron-blue-700" />
    );
  } else if (state === STEP_STATUS.PENDING) {
    return (
      <div className="relative flex h-3 w-3 items-center justify-center rounded-full bg-dark-neutral-gray-700" />
    );
  } else if (state === STEP_STATUS.FAILED) {
    return null;
  }
};

const Stepper = ({ model, stepperLoader }: IStepperProps) => {
  return (
    <>
      {stepperLoader ? (
        <ul className="flex flex-col gap-6">
          {[...Array(3)].map((_, index) => (
            <SkeletonIconText key={index} />
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col gap-6">
          {model.map((item, index) => (
            <li
              className={`${item.subLabelPlaceholder && "h-10"} ${
                item.command && "cursor-pointer"
              } flex w-36 items-center gap-2.06`}
              key={index}
              onClick={() => {
                item.command && item.command();
              }}
            >
              <div className="flex h-7.5 w-7.5 items-center justify-center">
                {getIconState(item.state)}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <Text
                  className={`inline-block text-sm text-dark-neutral-gray-700 ${
                    item.state === STEP_STATUS.ACTIVE
                      ? "text-primary-electron-blue-700"
                      : item.state === STEP_STATUS.FAILED
                        ? "text-red-300"
                        : "text-dark-neutral-gray-700"
                  }`}
                  label={item.label}
                />
                {item.subLabel && (
                  <Text className="inline-block text-xs text-neutral-200" label={item.subLabel} />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Stepper;

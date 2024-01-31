// Import necessary components and libraries
import ButtonBox from "component/ButtonBox/ButtonBox";
import CheckBox from "component/CheckBox/CheckBox";
import DatePicker from "component/DatePicker/DatePicker";
import InputBox from "component/InputBox/InputBox";
import InputTextArea from "component/InputTextArea/InputTextArea";
import RadioButton from "component/RadioButton/RadioButton";
import SimpleDropDown from "component/SimpleDropDown/SimpleDropDown";
import SkeletonCustom from "component/Skeleton/Skeleton";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { getStandardValidator, messageReplace } from "util/CommonUtil";
import { INPUT_STYLE_TYPE } from "util/Constant";
import { OperationType, ScreenRenderStatus } from "../../util/CommonConstant";
import FormController from "../../controller/FormController";
import formReducer, { INITIAL_FORM_STATE } from "../../reducer/FormReducer";
import FormDropDownHelperUtil from "../../helper/FormHelper";

const FormAutomation = () => {
  // Get the form UID from the URL parameters
  const formUid = useParams().uid ?? "";

  // Initialize formState and dispatcher using useReducer
  const [formState, dispatch] = useReducer(formReducer, {
    ...INITIAL_FORM_STATE,
    operationType: formUid ? OperationType.VIEW : OperationType.CREATE,
    uid: formUid,
  });

  const [, forceUpdate] = useState<undefined | boolean>(undefined);
  const simpleValidator = useRef(
    new SimpleReactValidator({
      validators: { ...getStandardValidator() },
      ...messageReplace(),
      autoForceUpdate: { forceUpdate: () => forceUpdate((prev) => !prev) },
    })
  );
  /* 
    -----------------------------------------------------------------------------------------------------------------------
    Validators:
    -----------------------------------------------------------------------------------------------------------------------
  */

  const validate = (e: any) => {
    simpleValidator?.current?.showMessageFor(e?.target?.name);
  };

  const validateForm = () => {
    let isValid = false;
    isValid = simpleValidator?.current?.allValid();
    if (isValid) {
      return true;
    } else {
      forceUpdate((prev) => !prev);
      simpleValidator?.current?.showMessages();
      forceUpdate((prev) => !prev);
      return false;
    }
  };
  // Create an instance of FormController to manage form actions
  const controller = new FormController(formState, dispatch);

  useEffect(() => {
    controller.init();
  }, []);

  // Event handlers for form inputs
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    controller.handleInputChange(event);
  };

  const handleChange = (event: { value: any; target: { name: string } }) => {
    controller.handleChange(event);
  };

  const handleCheckboxChange = (event: {
    value: any;
    target: { name: string; checked: boolean };
  }) => {
    controller.handleCheckboxChange(event);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    if (validateForm()) {
      event?.preventDefault();
      console.log("Form submitted with data:", formState);
      controller.submitForm();
    }
    // You can add your form submission logic here
  };

  // Handler for changing the page mode (EDIT or VIEW)
  const handlePageMode = (operationType: OperationType) => {
    controller.changePageMode(operationType);
  };

  console.log("OperationType", formState.operationType);

  return (
    <>
      {formState.screenRenderStatus === ScreenRenderStatus.LOADING ? (
        // Show a loading skeleton when data is loading
        <SkeletonCustom className="h-84.5 w-full rounded-xl" />
      ) : formState.screenRenderStatus === ScreenRenderStatus.ERROR ? (
        // Show an error message if there's an error
        <div className="text-red-700">Error</div>
      ) : (
        // Display the form elements when data is ready
        <div className="max-w-303 m-auto grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {/* Input Box */}
          <div className="border">
            <InputBox
              disabled={formState.operationType === OperationType.VIEW}
              errorClassNames=""
              hideErrorRow={false}
              hideLabel={false}
              isdisabledbyacl={false}
              isignoreaccesslevel={false}
              label="Input Box"
              labelClassNames=""
              name="input"
              onChange={handleInputChange}
              placeholder="Input Box"
              value={formState.data.input}
              onBlur={validate}
              validation={simpleValidator?.current?.message(
                "input",
                formState.data.input,
                "mandatory"
              )}
              variant={INPUT_STYLE_TYPE.PRIMARY}
            />
          </div>

          {/* Static Dropdown */}
          <div className="border">
            <SimpleDropDown
              disabled={formState.operationType === OperationType.VIEW}
              hideErrorRow={false}
              hideLabel={false}
              label="Static Dropdown"
              name="dropdownStaticData"
              onChange={handleChange}
              optionLabel="label"
              options={FormDropDownHelperUtil.staticDropDownOptions()}
              optionValue="value"
              value={formState.data.dropdownStaticData}
              variant={INPUT_STYLE_TYPE.PRIMARY}
            />
          </div>

          {/* API Dropdown */}
          <div className="border">
            <SimpleDropDown
              disabled={formState.operationType === OperationType.VIEW}
              hideErrorRow={false}
              hideLabel={false}
              label="API Dropdown"
              name="dropdownAPIData"
              onChange={handleChange}
              optionLabel="display"
              options={formState.data.dropdownAPIOptions}
              optionValue="code"
              value={formState.data.dropdownAPIData}
              variant={INPUT_STYLE_TYPE.PRIMARY}
            />
          </div>

          {/* Text Area */}
          <div className="border">
            <InputTextArea
              autoResize
              disabled={formState.operationType === OperationType.VIEW}
              errorClassNames=""
              errorStyleObj=""
              hideErrorRow={false}
              hideLabel={false}
              isdisabledbyacl={false}
              isignoreaccesslevel={false}
              label="Text Area"
              labelClassNames=""
              labelStyleObj=""
              maxCount={250}
              name="textarea"
              onChange={handleInputChange}
              placeholder="Text Area"
              rows={5}
              value={formState.data.textarea}
              variant={INPUT_STYLE_TYPE.PRIMARY}
            />
          </div>

          {/* Calendar */}
          <div className="border">
            <div>{formState.data.calendar?.toDateString?.()}</div>
            <DatePicker
              disabled={formState.operationType === OperationType.VIEW}
              label="Calendar"
              maxDate={new Date("01/01/2024")}
              minDate={new Date("01/01/2000")}
              name="calendar"
              onChange={handleChange}
              placeholder="dd/mm/yyyy"
              value={formState.data.calendar}
            />
          </div>

          {/* Checkbox */}
          <div className="border">
            <div>{formState?.data?.checkbox?.toString?.()}</div>
            <CheckBox
              disabled={formState.operationType === OperationType.VIEW}
              name="checkbox"
              checked={formState.data.checkbox}
              onChange={handleCheckboxChange}
              hideLabel
              hideErrorRow
            />
          </div>

          {/* Radio Buttons */}
          <div className="border">
            <div>{formState.data.radio}</div>
            <RadioButton
              disabled={formState.operationType === OperationType.VIEW}
              name="radio"
              label="Option 1"
              value="option1"
              checked={formState.data.radio === "option1"}
              onChange={handleChange}
              hideLabel={false}
              hideErrorRow
            />
            <RadioButton
              disabled={formState.operationType === OperationType.VIEW}
              name="radio"
              label="Option 2"
              value="option2"
              checked={formState.data.radio === "option2"}
              onChange={handleChange}
              hideLabel={false}
              hideErrorRow
            />
          </div>

          {/* Placeholder elements for columns 8 to 11 */}
          <div className="border">8</div>
          <div className="border">9</div>
          <div className="border">10</div>
          <div className="border">11</div>

          {/* Edit and Submit Buttons */}
          <div className="flex gap-1.5 border">
            {/* Show the Edit button in VIEW mode */}
            {formState.operationType === OperationType.VIEW && (
              <ButtonBox onClick={() => handlePageMode(OperationType.EDIT)} label="EDIT" />
            )}

            {/* Label of the button depends on the operation type */}
            <ButtonBox
              onClickWithLoader={handleSubmit}
              label={formState.operationType === OperationType.EDIT ? "SAVE" : "SUBMIT"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FormAutomation;

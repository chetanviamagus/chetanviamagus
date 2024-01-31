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
import branchReducer, { INITIAL_BRANCH_STATE } from "./BranchReducer";
import BranchController from "./BranchController";
import BranchDropDownHelperUtil from "./BranchHelper";

const PageBranch = () => {
  // Get the branch UID from the URL parameters
  const branchUid = useParams().uid ?? "";

  // Initialize branchState and dispatcher using useReducer
  const [branchState, dispatch] = useReducer(branchReducer, {
    ...INITIAL_BRANCH_STATE,
    operationType: branchUid ? OperationType.VIEW : OperationType.CREATE,
    uid: branchUid,
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

  const validateBranch = () => {
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
  // Create an instance of BranchController to manage branch actions
  const controller = new BranchController(branchState, dispatch);

  useEffect(() => {
    controller.init();
  }, []);

  // Event handlers for branch inputs
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
    if (validateBranch()) {
      event?.preventDefault();
      console.log("Branch submitted with data:", branchState);
      controller.submitBranch();
    }
    // You can add your branch submission logic here
  };

  // Handler for changing the page mode (EDIT or VIEW)
  const handlePageMode = (operationType: OperationType) => {
    controller.changePageMode(operationType);
  };

  console.log("OperationType", branchState.operationType);

  return (
    <>
      {branchState.screenRenderStatus === ScreenRenderStatus.LOADING ? (
        // Show a loading skeleton when data is loading
        <SkeletonCustom className="h-84.5 w-full rounded-xl" />
      ) : branchState.screenRenderStatus === ScreenRenderStatus.ERROR ? (
        // Show an error message if there's an error
        <div className="text-red-700">Error</div>
      ) : (
        // Display the branch elements when data is ready
        // <div className="w-full max-w-303 m-auto gap-3 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="max-w-303 m-auto w-full gap-3 sm:gap-6">
          {/* Input Box */}
          <div className="flex justify-between">
            <div>Product Income Scheme - Create</div>
            <div className="flex justify-between gap-6">
              <ButtonBox variant="secondary" label="Cancel" />
              <ButtonBox className="w-auto" label="Send for approval" />
              <ButtonBox variant="secondary" onClickWithLoader={handleSubmit} label="Save" />
            </div>
          </div>

          <div className="max-w-303 m-auto grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
            <div>
              <SimpleDropDown
                disabled={branchState.operationType === OperationType.VIEW}
                hideErrorRow={false}
                hideLabel={false}
                required={true}
                label="Product"
                name="dropdownStaticData"
                onChange={handleChange}
                optionLabel="label"
                options={BranchDropDownHelperUtil.staticDropDownOptions()}
                optionValue="value"
                value={branchState.data.dropdownStaticData}
                variant={INPUT_STYLE_TYPE.PRIMARY}
              />
            </div>
            <div>
              <SimpleDropDown
                disabled={branchState.operationType === OperationType.VIEW}
                hideErrorRow={false}
                hideLabel={false}
                required={true}
                label="Income scheme"
                name="dropdownStaticData"
                onChange={handleChange}
                optionLabel="label"
                options={BranchDropDownHelperUtil.staticDropDownOptions()}
                optionValue="value"
                value={branchState.data.dropdownStaticData}
                variant={INPUT_STYLE_TYPE.PRIMARY}
              />
            </div>
            <div>
              <InputBox
                required={true}
                disabled={branchState.operationType === OperationType.VIEW}
                errorClassNames=""
                hideErrorRow={false}
                hideLabel={false}
                isdisabledbyacl={false}
                isignoreaccesslevel={false}
                label="Name"
                labelClassNames=""
                name="input"
                onChange={handleInputChange}
                placeholder="Input Box"
                value={branchState.data.input}
                onBlur={validate}
                validation={simpleValidator?.current?.message(
                  "input",
                  branchState.data.input,
                  "mandatory"
                )}
                variant={INPUT_STYLE_TYPE.PRIMARY}
              />
            </div>
          </div>
          <div className="max-w-303 m-auto grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
            <div>
              <SimpleDropDown
                disabled={branchState.operationType === OperationType.VIEW}
                hideErrorRow={false}
                hideLabel={false}
                required={true}
                label="Bank/Financier"
                name="dropdownStaticData"
                onChange={handleChange}
                optionLabel="label"
                options={BranchDropDownHelperUtil.staticDropDownOptions()}
                optionValue="value"
                value={branchState.data.dropdownStaticData}
                variant={INPUT_STYLE_TYPE.PRIMARY}
              />
            </div>
            <div>
              <SimpleDropDown
                disabled={branchState.operationType === OperationType.VIEW}
                hideErrorRow={false}
                hideLabel={false}
                required={true}
                label="Lending Type"
                name="dropdownStaticData"
                onChange={handleChange}
                optionLabel="label"
                options={BranchDropDownHelperUtil.staticDropDownOptions()}
                optionValue="value"
                value={branchState.data.dropdownStaticData}
                variant={INPUT_STYLE_TYPE.PRIMARY}
              />
            </div>
          </div>
          <div className="max-w-303 m-auto grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6">
            <div>
              <InputTextArea
                autoResize
                disabled={branchState.operationType === OperationType.VIEW}
                errorClassNames=""
                errorStyleObj=""
                hideErrorRow={false}
                hideLabel={false}
                isdisabledbyacl={false}
                isignoreaccesslevel={false}
                label="Salient Features"
                labelClassNames=""
                labelStyleObj=""
                maxCount={250}
                name="textarea"
                onChange={handleInputChange}
                placeholder="Sample Description"
                rows={5}
                value={branchState.data.textarea}
                variant={INPUT_STYLE_TYPE.PRIMARY}
              />
            </div>
            <div>
              <InputTextArea
                autoResize
                disabled={branchState.operationType === OperationType.VIEW}
                errorClassNames=""
                errorStyleObj=""
                hideErrorRow={false}
                hideLabel={false}
                isdisabledbyacl={false}
                isignoreaccesslevel={false}
                label="Notes"
                labelClassNames=""
                labelStyleObj=""
                maxCount={250}
                name="textarea"
                onChange={handleInputChange}
                placeholder="Sample Description"
                rows={5}
                value={branchState.data.textarea}
                variant={INPUT_STYLE_TYPE.PRIMARY}
              />
            </div>
            <div>
              <InputTextArea
                autoResize
                disabled={branchState.operationType === OperationType.VIEW}
                errorClassNames=""
                errorStyleObj=""
                hideErrorRow={false}
                hideLabel={false}
                isdisabledbyacl={false}
                isignoreaccesslevel={false}
                label="Description"
                labelClassNames=""
                labelStyleObj=""
                maxCount={250}
                name="textarea"
                onChange={handleInputChange}
                placeholder=""
                rows={5}
                value={branchState.data.textarea}
                variant={INPUT_STYLE_TYPE.PRIMARY}
              />
            </div>
            <div>
              <InputTextArea
                required={true}
                autoResize
                disabled={branchState.operationType === OperationType.VIEW}
                errorClassNames=""
                errorStyleObj=""
                hideErrorRow={false}
                hideLabel={false}
                isdisabledbyacl={false}
                isignoreaccesslevel={false}
                label="Reasons/Comments"
                labelClassNames=""
                labelStyleObj=""
                maxCount={250}
                name="textarea"
                onChange={handleInputChange}
                placeholder="Sample Description"
                rows={5}
                value={branchState.data.textarea}
                variant={INPUT_STYLE_TYPE.PRIMARY}
              />
            </div>
          </div>

          {/* Edit and Submit Buttons */}
          <div className="flex gap-1.5 border">
            {/* Show the Edit button in VIEW mode */}
            {/* {branchState.operationType === OperationType.VIEW && (
              <ButtonBox onClick={() => handlePageMode(OperationType.EDIT)} label="EDIT" />
            )} */}

            {/* Label of the button depends on the operation type */}
            {/* <ButtonBox
              onClickWithLoader={handleSubmit}
              label={branchState.operationType === OperationType.EDIT ? "SAVE" : "SUBMIT"}
            /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default PageBranch;

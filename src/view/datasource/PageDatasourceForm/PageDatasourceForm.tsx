import awsLogo from "asset/img/logos/datasource/aws-logo.svg";
import successGif from "asset/img/lottie/succes_gif.gif";
import ButtonBox from "component/ButtonBox/ButtonBox";
import InputBox from "component/InputBox/InputBox";
import Text from "component/Text/Text";
import CreateFormController from "controller/datasource/CreateFormController";
import { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import createFormReducer, {
  INITIAL_DATASOURCE_CREATE_STATE,
} from "reducer/datasource/CreateFormReducer";
import { linkAuthRoute, linkDataSourceAddNew, linkDataSourceSelect, linkProjectList } from "routes";
import CreateFormAPIService from "service/datasource/CreateFormAPIService";
import SimpleReactValidator from "simple-react-validator";
import { ScreenRenderStatus } from "util/CommonConstant";
import {
  getStandardValidator,
  messageReplace,
  parseStandardAPIErrorMessage,
} from "util/CommonUtil";
import { LOCAL_STORAGE } from "util/Constant";
import { DATASOURCE_ASSETS, DATASOURCE_PAGE_LIST } from "util/DataSourceConstant";
import { v4 as uuidv4 } from "uuid";

function PageDatasourceForm() {
  const navigate = useNavigate();
  const { datasourceKey } = useParams();

  const [createFormState, dispatch] = useReducer(createFormReducer, {
    ...INITIAL_DATASOURCE_CREATE_STATE,
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

  // Create an instance of CreateFormController to manage form actions
  const controller = new CreateFormController(createFormState, dispatch);

  useEffect(() => {
    controller.init();
  }, []);

  // Event handlers for form inputs
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    controller.handleInputChange(event);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();
    return new Promise((resolve, reject) => {
      if (!validateForm()) {
        reject("Not Valid");
        return;
      }
      try {
        controller.submitForm();
        // goBack();
        CreateFormAPIService.dispatchConnectionSuccess(dispatch);
        const datasourceArray: any[] = localStorage.getItem(LOCAL_STORAGE.DATASOURCE_LIST)
          ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.DATASOURCE_LIST) || "")
          : [];
        const dataSource: any = DATASOURCE_PAGE_LIST?.find?.(
          (datasource: any) => datasource?.key === datasourceKey
        );

        datasourceArray.push({ ...dataSource, uid: uuidv4() });

        localStorage.setItem(LOCAL_STORAGE.DATASOURCE_LIST, JSON.stringify(datasourceArray));
      } catch (err: any) {
        CreateFormAPIService.dispatchErrorMessageAction(
          dispatch,
          parseStandardAPIErrorMessage(err) ?? err?.message ?? "Error"
        );
      } finally {
        resolve("Success");
      }
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  const gotoAddNewDataPage = () => {
    navigate(linkAuthRoute + linkDataSourceAddNew);
  };

  const gotoDatasourceSelectPage = () => {
    navigate(linkAuthRoute + linkDataSourceSelect + `/${datasourceKey}`);
  };

  const gotToCreateProjectPage = () => {
    navigate(linkAuthRoute + linkProjectList);
  };

  const getDataSourceObject = () => {
    if (datasourceKey) {
      return DATASOURCE_ASSETS[datasourceKey as keyof typeof DATASOURCE_ASSETS];
    }
  };

  const dataSourceObject: any = getDataSourceObject();

  return (
    <div className="flex h-full mx-auto w-full md:max-w-rightContent p-3 items-center justify-center">
      <div className="my-auto flex flex-col items-center">
        <img
          src={dataSourceObject?.logo ?? awsLogo}
          alt={dataSourceObject?.key ?? "aws"}
          className="max-h-9"
        />
        {createFormState.screenRenderStatus === ScreenRenderStatus.SUCCESS ? (
          <>
            <Text
              className="mt-9 text-center text-heading-3 font-semibold"
              label={"Account Connected"}
            />

            {/* <Player
                autoplay
                src={successTickLottie}
                keepLastFrame
                style={{ height: "94px", width: "94px" }}
              /> */}
            <img className="mb-3 h-30 w-30 p-3" src={successGif} alt="success-animation" />

            <div className="flex items-center gap-3">
              <Text
                className="border-r border-dark-neutral-gray-700 pr-3 text-center text-body-copy-2 text-dark-neutral-gray-700"
                label={"IAM : User123"}
              />

              <Text
                className="border-r border-dark-neutral-gray-700 pr-3 text-center text-body-copy-2 text-dark-neutral-gray-700"
                label={"Acc. No :  123456789012"}
              />

              <Text
                className="text-center text-body-copy-2 text-dark-neutral-gray-700"
                label={"1670 data sources"}
              />
            </div>

            <div className="mb-3 mt-6 flex w-full justify-center gap-6">
              <ButtonBox
                label="View Data Sources"
                variant="secondary"
                className="w-44"
                onClick={gotoDatasourceSelectPage}
              />
              <ButtonBox
                label="Set up a project"
                className="w-44"
                onClick={gotToCreateProjectPage}
              />
            </div>

            <Text label={"OR"} className="text-body-copy-2" />

            <div className="w-full">
              <ButtonBox
                label="Add Another Account"
                variant="no-border"
                onClick={gotoAddNewDataPage}
              />
            </div>
          </>
        ) : (
          <>
            <div className="mt-9 text-center text-heading-3 font-semibold">
              Connect {dataSourceObject?.name ?? ""} Account
            </div>
            {/* <Text
              className="text-heading-3 mt-9 text-center font-semibold"
              label={"Connect AWS Account"}
            /> */}
            <div className="mt-9 w-full">
              <InputBox
                label={"Access Key ID"}
                placeholder={"Enter Access Key ID"}
                mandatory={true}
                name="accessKey"
                onChange={handleInputChange}
                value={createFormState.data.accessKey}
                onBlur={validate}
                validation={simpleValidator?.current?.message(
                  "accessKey",
                  createFormState.data.accessKey,
                  "mandatory"
                )}
              />
            </div>
            <div className="mt-3 w-full">
              <InputBox
                label={"Secret Access Key"}
                placeholder={"Enter Secret Access Key"}
                mandatory={true}
                name="secretAccessKey"
                onChange={handleInputChange}
                value={createFormState.data.secretAccessKey}
                onBlur={validate}
                validation={simpleValidator?.current?.message(
                  "secretAccessKey",
                  createFormState.data.secretAccessKey,
                  "mandatory"
                )}
              />
            </div>
            <div className="mt-6 w-full">
              <ButtonBox label="Connect" onClickWithLoader={handleSubmit} />
            </div>

            <div className="mt-3 w-full">
              <ButtonBox label="Back" variant="no-border" onClick={goBack} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PageDatasourceForm;

import React, { useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import uploadIcon from "asset/img/icons/upload_icon.svg";
import Text from "component/Text/Text";
import { XCircleIcon } from "@heroicons/react/24/outline";
import Loader from "component/Loader";

interface FileUploadComponentProps {
  className?: string;
  onFileSelect: (files: File[]) => void;
}

const FileUploadDemo: React.FC<FileUploadComponentProps> = (props: FileUploadComponentProps) => {
  const { className, onFileSelect } = props;
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileUploadRef = useRef<FileUpload>(null);

  const onSelect = (event: any) => {
    setIsLoading(true);
    const newFiles = [...event.files];
    setTimeout(() => {
      setUploadedFiles(newFiles);
      onFileSelect(newFiles);
      setIsLoading(false);
    }, 1500);
  };

  const removeFile = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUploadedFiles([]);
      onFileSelect([]);
      setIsLoading(false);
    }, 500);
  };

  const renderUploadedFile = () => {
    return (
      <div className="relative h-15 w-15 py-1.5">
        <img
          src={URL.createObjectURL(uploadedFiles[0])}
          alt={`Uploaded file`}
          className="h-full w-full object-fill"
        />

        <XCircleIcon
          onClick={removeFile}
          className="absolute -right-2 top-0 h-5 w-5 cursor-pointer text-dark-neutral-gray-800 hover:text-white"
        />
      </div>
    );
  };

  const headerTemplate = (options: any) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    return (
      <div className={"w-ful h-full leading-none"}>
        {chooseButton}
        <span className="text-sm font-normal text-dark-neutral-gray-600">
          <Text label={" or Drag and drop here"} />
        </span>
        <div className="pt-3 text-xxs font-normal text-dark-neutral-gray-600">
          <Text label={"JPG, JPEG or PNG, file size not more than 10MB"} />
        </div>

        {uploadButton}

        {cancelButton}
      </div>
    );
  };

  const chooseOptions = {
    className: "text-sm font-normal text-white underline",
    label: "Upload file",
    icon: "pi ",
  };

  const uploadOptions = {
    className: "hidden",
    label: " ",
  };

  const cancelOptions = {
    className: "hidden",
    label: " ",
  };

  return (
    <div
      className={`flex h-24 w-82 items-center gap-2 rounded-lg border border-dashed border-dark-neutral-gray-600 bg-transparent p-3 ${
        className ?? ""
      }`}
    >
      {isLoading ? (
        <div className="h-15 w-15">
          <Loader />
        </div>
      ) : uploadedFiles.length === 0 ? (
        <div className="h-15 w-15 py-1.5">
          <img src={uploadIcon} alt="upload-icon" />
        </div>
      ) : (
        renderUploadedFile()
      )}

      <FileUpload
        ref={fileUploadRef}
        name="demo[]"
        // mode="advanced"
        // customUpload
        // uploadHandler={(e) => onUpload(e)}
        onSelect={(e) => onSelect(e)}
        onBeforeDrop={(e) => {
          console.log(e);
        }}
        accept="image/*"
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
        // maxFileSize={1000000} // Adjust the max file size as needed
        headerTemplate={headerTemplate}
      />

      {/* {uploadedFiles.length > 0 && renderUploadedFile()} */}
    </div>
  );
};

export default FileUploadDemo;

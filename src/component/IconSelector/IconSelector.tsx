import { ArrowPathIcon, CheckIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

interface IconSelectorProps {
  images: string[];
  onImageSelect: (selectedImage: string) => void;
  imageUploaded?: boolean | string | null;
}

const IconSelector: React.FC<IconSelectorProps> = (props: IconSelectorProps) => {
  const { images, onImageSelect, imageUploaded } = props;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const imagesToShow = images.slice(startIndex, startIndex + 4);

  useEffect(() => {
    if (imageUploaded) {
      setSelectedImage(null);
    }
  }, [imageUploaded]);

  useEffect(() => {
    if (imagesToShow.length <= 0) {
      setStartIndex(0);
    }
  }, [imagesToShow]);

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
    onImageSelect(image); // Notify the parent component about the selected image
  };

  const handleRefresh = () => {
    const newStartIndex = startIndex + 4;
    setStartIndex(newStartIndex);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-24 w-90 gap-2 rounded-lg border border-dark-neutral-gray-300 bg-primary-electron-blue-200 p-2">
        {imagesToShow.map((image, index) => (
          <div
            className="relative h-20 w-20 cursor-pointer rounded-md bg-[#122E55] p-2.5"
            key={index}
            onClick={() => handleImageSelect(image)}
            style={{ border: selectedImage === image ? "1px solid #3C91E2" : "none" }}
          >
            <img
              src={image}
              className="object-fit h-full w-full rounded-full"
              alt={`Image ${index + 1}`}
            />

            {selectedImage === image ? (
              <div className="absolute -right-2 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary-electron-blue-700">
                <CheckIcon className="h-3 w-3 text-primary-electron-blue-300" />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="h-4 w-4">
        <ArrowPathIcon className="cursor-pointer" onClick={handleRefresh} />
      </div>
    </div>
  );
};

export default IconSelector;

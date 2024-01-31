/**
 * Author : Harshavardhan
 * Created on : 08 Jan, 2024
 **/
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Text from "component/Text/Text";
import { Accordion, AccordionProps, AccordionTab, AccordionTabProps } from "primereact/accordion";
import React, { useState } from "react";

interface AccordionItem {
  header: string;
  content: React.ReactNode;
}

interface ISimpleAccordionProps extends AccordionProps, AccordionTabProps {
  variant?: "default" | "secondary";
  headerText?: string;
  contentText?: string;
  content?: string;
  accordionItems: AccordionItem[];
}

const SimpleAccordionWithoutMemo: React.FC<ISimpleAccordionProps> = (
  props: ISimpleAccordionProps
) => {
  const { accordionItems, variant, ...PrimeReactProps } = props;

  const { id, className, multiple } = PrimeReactProps;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onTabChange = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const headerContent = (header: string, index: number) => {
    const isTabActive = activeIndex === index;

    if (variant === "secondary") {
      return (
        <div className={`group w-full cursor-pointer py-3`}>
          <div className="flex w-full items-center gap-3">
            <div className=" group-hover:text-white">
              <Text label={header} className="pointer-events-none" />
            </div>

            <ChevronDownIcon
              className={`h-6 w-6 transform transition-transform group-hover:text-white ${
                isTabActive ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={`group w-full cursor-pointer py-3`}>
        <div className="flex w-full items-center justify-between px-3">
          <div className="text-sm font-semibold text-dark-neutral-gray-900 group-hover:text-white">
            <Text label={header} />
          </div>

          <ChevronDownIcon
            className={`h-9 w-9 transform rounded-full p-1.5 text-dark-neutral-gray-500 transition-transform group-hover:bg-dark-neutral-gray-200 group-hover:text-white ${
              isTabActive ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full ${variant === "secondary" ? "secondary" : "primary"}`}>
      <Accordion
        id={id}
        activeIndex={activeIndex}
        multiple={multiple}
        className={className}
        onTabChange={(e) => onTabChange(e.index)}
        {...PrimeReactProps}
      >
        {accordionItems.map((item, index) => (
          <AccordionTab
            key={index}
            className="w-full "
            headerTemplate={headerContent(item.header, index)}
          >
            {item.content}
          </AccordionTab>
        ))}
      </Accordion>
    </div>
  );
};

// ----------- memoization -------------------- //
const SimpleAccordion = React.memo(SimpleAccordionWithoutMemo);

// ----------- exports ------------------------ //
export default SimpleAccordion;

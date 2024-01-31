import { memo } from "react";
import { Trans } from "react-i18next";

interface IText {
  label?: any;
  className?: string;
  htmlFor?: string;
  isTruncate?: boolean; // Add the isTruncate prop
}

const Text = (props: IText) => {
  const { label, htmlFor, className, isTruncate = false, ...restProps } = props;

  // Conditionally truncate the label based on isTruncate:
  const truncatedLabel =
    isTruncate && label && label.length > 6
      ? `${label.slice(0, 6)}...`
      : label;

  return (
    <label title={label} htmlFor={htmlFor} className={` ${className}`} {...restProps}>
      <Trans>{truncatedLabel}</Trans>
    </label>
  );
};

export default memo(Text);

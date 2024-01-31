import { usePrevious } from "hook/usePrevious";
import { memo, useEffect, useState } from "react";

export const AnimateTyping = (props: any) => {
  const { children, delay, key } = props;

  const [value, setValue] = useState("");

  const prevValues: any = usePrevious({ children });

  useEffect(() => {
    if (value.length < children?.length) {
      const timer = setTimeout(() => {
        setValue(children?.substring(0, value.length + (props?.wordJump ?? 1)));
      }, delay ?? 100);
      return () => clearTimeout(timer);
    } else {
      props.onTypingComplete?.();
    }
  }, [value, children, props.onTypingComplete]);

  useEffect(() => {
    if (
      prevValues?.children?.length > 0 &&
      children?.length > 0 &&
      prevValues?.children !== children
    ) {
      setValue("");
    }
  }, [children, key]);

  return (
    <span>
      {value}
      {value.length >= children?.length - 1 ? "" : "▍"}
    </span>
  );
};

export default memo(AnimateTyping);

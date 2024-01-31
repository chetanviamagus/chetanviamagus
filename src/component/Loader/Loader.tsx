import React from "react";
import { FadeLoader } from "react-spinners";
interface ILoaderProps {
  loading?: boolean;
  color?: string;
  css?: string;
  speedMultiplier?: number;
}
function LoaderWithoutMemo(props: ILoaderProps) {
  const { loading, color, css, speedMultiplier } = props;

  return (
    <div className="grid h-full place-items-center">
      <FadeLoader
        {...props}
        loading={loading}
        color={"#ff0000"}
        // css={css}
        speedMultiplier={speedMultiplier}
      />
    </div>
  );
}

// memoization
const Loader = React.memo(LoaderWithoutMemo);
// redux wiring

// exports
export default Loader;

import React from "react";

import NBMarkdown from "component/NBMarkdown";

const SplitView = ({ children }: any) => {
  return (
    <div className="flex gap-x-12">
      <div className="flex-1">
        <NBMarkdown>{children?.split("@S1S")[1]?.split("@S1E")[0]}</NBMarkdown>
      </div>
      <div className="flex-1">
        <NBMarkdown>{children?.replace(/\n$/, "")?.split("@S2S")[1]?.split("@S2E")[0]}</NBMarkdown>
      </div>
    </div>
  );
};

export default React.memo(SplitView);

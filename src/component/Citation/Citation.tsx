import React, { useEffect, useState } from "react";

const Citation = ({ stringData }: any) => {
  const [loading, setLoading] = useState(true);
  const [citationData, setCitationData] = useState<any>();

  useEffect(() => {
    if (stringData?.includes?.("~END~")) {
      const _fData: string =
        stringData
          ?.replace?.("~END~", "")
          ?.replace(/▍|\n|`/g, "")
          ?.trim?.() || "{}";
      try {
        console.log(_fData);
        setCitationData(JSON.parse(_fData));
      } catch (e) {
        console.log("Error:", e);
      } finally {
        setLoading(false);
      }
      //   console.log(JSON.parse(_fData.replace(/&quot;/gi, '"')));

      //   try {
      //     setCitationData(JSON.parse(_fData || "{}") ?? {});
      //   } catch {
      //     (e: any) => {
      //       console.log("er", e);
      //     };
      //   } finally {
      //     setLoading(false);
      //   }
    }
  }, [stringData]);

  if (loading) {
    return <span className="h-3 w-3 rounded-full" />;
  }
  return (
    <span
      className="inline-block !h-5 !w-5 cursor-pointer rounded-full bg-gray-400 text-center text-body-copy-2 hover:bg-blue-300"
      onClick={() => alert(`Message from data: ${citationData?.message ?? ""}`)}
    >
      {citationData?.num ?? ""}
    </span>
  );
};

export default Citation;

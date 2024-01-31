import BaseDiagram from "component/base/BaseDiagram/BaseDiagram";
import { useAppSelector } from "hook/redux";
import { useEffect, useState } from "react";
import StaticDataService from "service/StaticDataService";

interface IProps {
  diagramData: string;
}

interface IDiagramDS {
  nodes: any[];
  edges: any[];
}

const ChatDiagram = (props: IProps) => {
  const [data, setData] = useState<IDiagramDS>({
    nodes: [],
    edges: [],
  });
  const [loader, setLoader] = useState(true);
  const currentProject = useAppSelector((state) => state.project.selectedProject);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    if (props.diagramData?.includes?.("~END~")) {
      setTimeout(async () => {
        const data = await importDataFile();
        const response: any = await StaticDataService.getChatDiagramData(data || undefined);
        if (response.status === 200) {
          setData(response.data);
        }
        setLoader(false);
      }, 500);
    }
  };

  const importDataFile = async () => {
    let iData: any;
    try {
      const a = await import(
        `./../../poc/${(
          currentProject.projectInfo?.projectName ?? currentProject?.name
        )?.toLowerCase?.()}/store.js`
      );

      const chartID = props.diagramData.replace?.("~END~", "")?.trim?.();

      iData = a.default?.[chartID];
    } catch (err) {
      const a: any = await import(`./../../poc/kroger/store.js`);

      const chartID = props.diagramData.replace?.("~END~", "")?.trim?.();

      iData = a.default?.[chartID];
    }

    return iData;
  };

  if (loader) {
    return (
      <div className="relative h-64 w-full p-4 ">
        <div className="flex h-full items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-diagram h-64 w-full">
      <BaseDiagram nodes={data.nodes ?? []} edges={data.edges ?? []} />
    </div>
  );
};

export default ChatDiagram;

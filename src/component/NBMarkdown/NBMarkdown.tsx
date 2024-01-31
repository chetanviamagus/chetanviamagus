import ChatDiagram from "component/ChatDiagram/ChatDiagram";
import Citation from "component/Citation/Citation";
import DoughNut from "component/DoughNut/DoughNut";
import { CodeBlock } from "component/Markdown/CodeBlock";
import { MemoizedReactMarkdown } from "component/Markdown/MemoizedReactMarkdown";
import NivoLineChart from "component/NivoLineChart/NivoLineChart";
import NivoPieChart from "component/NivoPieChart/NivoPieChart";
import SplitView from "component/SplitView/SplitView";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function NBMarkdown(props: any) {
  const { children, openPromptTemplate } = props;

  //add onclick function to the span tag and alert their data-id attribute
  const handleSpanClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    const dataId = event.currentTarget.getAttribute("data-id");

    openPromptTemplate?.();
  };

  return (
    <>
      <MemoizedReactMarkdown
        className="prose dark:prose-invert flex-1"
        //@ts-ignore
        remarkPlugins={[remarkGfm]}
        //@ts-ignore
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            if (children.length) {
              if (children[0] == "▍") {
                return <span className="mt-1 animate-pulse cursor-default">▍</span>;
              }

              children[0] = (children[0] as string).replace("`▍`", "▍");
            }

            const match = /language-(\w+)/.exec(className || "");

            return match?.[1]?.includes("graph_line") ? (
              <NivoLineChart chartData={String(children).replace(/\n$/, "")} />
            ) : match?.[1]?.includes("graph_pie") ? (
              <NivoPieChart chartData={String(children).replace(/\n$/, "")} showLegends />
            ) : match?.[1]?.includes("graph_doughnut") ? (
              <NivoPieChart chartData={String(children).replace(/\n$/, "")} innerRadius={0.5} showLegends />
            ) : match?.[1]?.includes("doughnutchart") ? (
              <DoughNut
                chartData={String(children).replace(/\n$/, "")}
                style={{ height: "173px", width: "173px" }}
                chartLabel={"Doughnut"}
                className="h-full w-full"
              />
            ) : match?.[1]?.includes("split_view") ? (
              <SplitView>{String(children)}</SplitView>
            ) : match?.[1]?.includes("diagram") ? (
              <ChatDiagram diagramData={String(children).replace(/\n$/, "")} />
            ) : !inline ? (
              <CodeBlock
                key={Math.random()}
                language={(match && match[1]) || ""}
                value={String(children).replace(/\n$/, "")}
                {...props}
              />
            ) : (
              <code {...props}>{children}</code>
            );
          },
          table({ children }) {
            return (
              <table className="border-collapse border border-black px-3 py-1 dark:border-white">
                {children}
              </table>
            );
          },
          th({ children }) {
            return (
              <th className="break-words border border-black bg-gray-500 px-3 py-1 text-white dark:border-white">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="break-words border border-black px-3 py-1 dark:border-white">
                {children}
              </td>
            );
          },
          span({ children, className, ...props }) {
            if (className?.includes("nbc")) {
              return (
                <span onClick={handleSpanClick} className={className} {...props}>
                  {children}
                </span>
              );
            }
            return <span {...props}>{children}</span>;
          },
        }}
      >
        {children}
      </MemoizedReactMarkdown>
    </>
  );
}

export default NBMarkdown;

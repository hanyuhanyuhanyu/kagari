import remarkRehype from "remark-rehype";
import DOMPurify from "dompurify";
import rehypeStringify from "rehype-stringify";
import RemarkBreaks from "remark-breaks";
import RemarkEmoji from "remark-emoji";
import { unified } from "unified";
import { useAwaitable } from "./awaitable";
import remarkParse from "remark-parse";
import type { Root } from "mdast";
import mermaid from "mermaid";
import { getTheme } from "../global/theme";
mermaid.initialize({ theme: getTheme() });
function VisualizeMermaid() {
  return async function (tree: Root) {
    await Promise.all(
      tree.children.map(async (t, ind) => {
        if (t.type !== "code" || t.lang !== "mermaid") return;
        await mermaid.render(`svg-${ind}`, t.value).then((r) => {
          // 直接svgをtype=htmlとして渡すとDOMPurifyが内部のLabelとかを消してしまう
          // なのでimgとして渡すが、styleを取ってこないと滅茶苦茶でかい画像になってしまう
          const style = new DOMParser()
            .parseFromString(r.svg, "text/html")
            .getElementsByTagName("svg")[0]?.style;
          tree.children[ind] = {
            type: "html",
            value: `<img src="data:image/svg+xml;base64,${btoa(r.svg)}" style="${style?.cssText || ""}"/>`,
          };
        });
      })
    );
  };
}

async function parseMarkdown(text: string) {
  const uni = await unified()
    .use(remarkParse)
    .use(RemarkBreaks)
    .use(RemarkEmoji)
    .use(VisualizeMermaid)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(text);
  return DOMPurify.sanitize(uni.toString());
}
export const useMarkdownParser = useAwaitable(parseMarkdown);

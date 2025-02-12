import { useEffect, useState } from "react";
import RemarkBreaks from "remark-breaks";
import RemarkEmoji from "remark-emoji";
import { articleApi } from "../../../external_interface/http/backend/article";
import { useParams } from "react-router";
import type { Root } from "mdast";
import mermaid from "mermaid";
import { unified } from "unified";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import { getTheme } from "../../../global/theme";
mermaid.initialize({ theme: getTheme() });
function VisualizeMermaid() {
  return async function (tree: Root) {
    await Promise.all(
      tree.children.map(async (t, ind) => {
        if (t.type !== "code" || t.lang !== "mermaid") return;
        await mermaid.render(`svg-${ind}`, t.value).then((r) => {
          tree.children[ind] = {
            type: "html",
            value: r.svg,
          };
        });
      })
    );
  };
}
function Article() {
  let { url } = useParams();
  const [text, setText] = useState("");
  useEffect(() => {
    (async () => {
      const text = await articleApi.getBody(decodeURIComponent(url || ""));
      const uni = await unified()
        .use(remarkParse)
        .use(RemarkBreaks)
        .use(RemarkEmoji)
        .use(VisualizeMermaid)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(text);
      setText(uni.toString());
    })();
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
}

export default Article;

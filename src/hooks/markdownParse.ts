import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import RemarkBreaks from "remark-breaks";
import RemarkEmoji from "remark-emoji";
import { unified } from "unified";
import remarkParse from "remark-parse";
import type { Root as HastRoot, RootContent } from "hast";
import mermaid from "mermaid";
import { getTheme } from "../global/theme";
import rehypeExpressiveCode from "rehype-expressive-code";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { sanitize } from "hast-util-sanitize";

mermaid.initialize({ theme: getTheme() });
mermaid.registerIconPacks([
  {
    name: "logos",
    loader: () => import("@iconify-json/logos").then(({ icons }) => icons),
  },
  {
    name: "simple-icons",
    loader: () =>
      import("@iconify-json/simple-icons").then(({ icons }) => icons),
  },
]);
function VisualizeMermaid() {
  return async function (tree: HastRoot) {
    // @ts-expect-error typing difficult
    const nodes = [];
    const promises: Promise<void>[] = [];
    visit(
      tree,
      {
        type: "element",
        tagName: "pre",
      },
      (node) => {
        if (
          // @ts-expect-error assume `properties` exists
          !node.children?.[0]?.properties?.className?.includes(
            "language-mermaid"
          )
        )
          return;
        nodes.push(node);
      }
    );
    // @ts-expect-errors suppress
    for (const [index, node] of Object.entries(nodes)) {
      const first = node.children?.[0]?.children?.[0];
      if (!first) continue;
      promises.push(
        mermaid.render(`svg-${index}`, first.value).then((r) => {
          node.children[0] = {
            type: "raw",
            value: r.svg,
          };
          return;
        })
      );
    }
    await Promise.all(promises);
  };
}
function purify() {
  return async function (tree: HastRoot) {
    tree.children.forEach((n, i) => {
      tree.children[i] = sanitize(n) as RootContent;
    });
  };
}

export async function parseMarkdown(text: string) {
  const uni = await unified()
    .use(remarkParse)
    .use(RemarkBreaks)
    .use(remarkGfm)
    .use(RemarkEmoji)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(purify)
    .use(VisualizeMermaid)
    .use(rehypeExpressiveCode)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(text);
  return uni.toString();
}

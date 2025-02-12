import { articleApi } from "../../../external_interface/http/backend/article";
import { useParams } from "react-router";
import { useAwaitable } from "../../../hooks/awaitable";
import { parseMarkdown } from "../../../hooks/markdownParse";

function Article() {
  const { url } = useParams();
  const { result: html } = useAwaitable((u) =>
    articleApi.getBody(u).then(parseMarkdown)
  )(decodeURIComponent(url || ""));
  return <div dangerouslySetInnerHTML={{ __html: html || "" }} />;
}

export default Article;

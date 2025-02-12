import { articleApi } from "../../../external_interface/http/backend/article";
import { useParams } from "react-router";
import { useAwaitable } from "../../../hooks/awaitable";
import { useMarkdownParser } from "../../../hooks/markdownParse";

function Article() {
  const { url } = useParams();
  const [body] = useAwaitable(articleApi.getBody)(
    decodeURIComponent(url || "")
  );
  const [html] = useMarkdownParser(body || "");
  return <div dangerouslySetInnerHTML={{ __html: html || "" }} />;
}

export default Article;

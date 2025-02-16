import { articleApi } from "../../external_interface/http/backend/article";
import { useParams } from "react-router";
import { useAwaitable } from "../../hooks/awaitable";
import { parseMarkdown } from "../../hooks/markdownParse";
import "./each.css";
import Loader from "../../components/atoms/Loader";
function Article() {
  const { url } = useParams();
  const { result: html, valid } = useAwaitable(
    (u) => articleApi.getBody(u).then(parseMarkdown),
    decodeURIComponent(url || "")
  );
  if (!valid) return <Loader />;
  return (
    <div
      className="markdown-wrapper"
      dangerouslySetInnerHTML={{ __html: html || "" }}
    />
  );
}

export default Article;

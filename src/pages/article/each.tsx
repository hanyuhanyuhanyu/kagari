import { articleApi } from "../../external_interface/http/backend/article";
import { useParams } from "react-router";
import { useAwaitable } from "../../hooks/awaitable";
import Markdown from "../../components/organisms/Markdown";
import Loader from "../../components/atoms/Loader";
function Article() {
  const { url } = useParams();
  const { result: markdown, valid } = useAwaitable(
    (u) => articleApi.getBody(u),
    decodeURIComponent(url || "")
  );
  if (!valid) {
    return <Loader />;
  }
  return <Markdown text={markdown} />;
}

export default Article;

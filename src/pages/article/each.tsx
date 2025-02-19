import { articleApi } from "../../external_interface/http/backend/article";
import { useParams } from "react-router";
import Markdown from "../../components/organisms/Markdown";
function Article() {
  const { url } = useParams();
  return (
    <Markdown
      fetcher={() => articleApi.getBody(decodeURIComponent(url || ""))}
      key={url}
    />
  );
}

export default Article;

import { articleApi } from "../external_interface/http/backend/article";
import Markdown from "../components/organisms/Markdown";

function Home() {
  return (
    <Markdown
      className="overflow-x-hidden"
      fetcher={() =>
        articleApi.getBody(
          "202502/20250220_d68659a2-9df9-4404-902a-f4138d3ee3bd.md"
        )
      }
    />
  );
}

export default Home;

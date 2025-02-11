import { useEffect, useState } from "react";
import {
  Article,
  articleApi,
} from "../../external_interface/http/backend/article";
function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    (async () => {
      const articles = await articleApi.search();
      setArticles(articles);
    })();
  }, []);
  return (
    <>
      {articles.map((a) => (
        <a href={`/article/${encodeURIComponent(a.url)}`} key={a.url}>
          {a.title}
        </a>
      ))}
    </>
  );
}

export default Home;

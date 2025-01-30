import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import RemarkBreaks from "remark-breaks";
import RemarkEmoji from "remark-emoji";
const apiBase =
  "https://zoqqfl4b4jblcji34ewncf37fe0mvmem.lambda-url.ap-northeast-1.on.aws";
const s3Base = "https://kagari-markdown.s3.ap-northeast-1.amazonaws.com";
function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const getArticleId = () => {
    const articleId = urlParams.get("article_id");
    if (typeof articleId !== "string") return;
    if (articleId.length > 32 || articleId.match(/\D/)) return;
    return articleId;
  };
  const fetchArticle = async () => {
    const url = await fetch(apiBase, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        articleId: getArticleId() || 1,
      }),
    })
      .then((r) => r.json())
      .then((r) => r.url);
    return await fetch(`${s3Base}/${url}`, {
      cache: "no-cache",
    }).then((r) => r.text());
  };
  const [text, setText] = useState("");
  useEffect(() => {
    fetchArticle().then(setText);
  }, []);
  return (
    <Markdown remarkPlugins={[RemarkBreaks, RemarkEmoji]}>{text}</Markdown>
  );
}

export default App;

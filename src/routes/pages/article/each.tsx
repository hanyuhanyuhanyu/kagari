import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import RemarkBreaks from "remark-breaks";
import RemarkEmoji from "remark-emoji";
import { articleApi } from "../../../external_interface/http/backend/article";
import { useParams } from "react-router";
function Article() {
  let { url } = useParams();
  const [text, setText] = useState("");
  useEffect(() => {
    (async () => {
      await articleApi.getBody(decodeURIComponent(url || "")).then(setText);
    })();
  }, []);
  return (
    <Markdown remarkPlugins={[RemarkBreaks, RemarkEmoji]}>{text}</Markdown>
  );
}

export default Article;

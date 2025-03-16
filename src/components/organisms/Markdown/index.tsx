import { useEffect } from "react";
import { useAwaitable } from "../../../hooks/awaitable";
import { parseMarkdown } from "../../../hooks/markdownParse";
import Loader from "../../atoms/Loader";
import "./style.css";

type Props = {
  className?: string;
  fetcher: () => Promise<string>;
  onRender?: () => void;
};
function Markdown(props: Props) {
  const { result: html, valid } = useAwaitable(() =>
    props
      .fetcher()
      .then(parseMarkdown)
      .then((a) => {
        setTimeout(props.onRender || (() => 0), 1);
        return a;
      })
  );
  useEffect(() => {
    // @ts-expect-error twttr
    window.twttr && window.twttr.widgets.load();
  }, [html]);
  if (!valid) return <Loader />;
  return (
    <>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
      ></script>
      <div
        className={`${props.className} markdown-wrapper`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}

export default Markdown;

import { useAwaitable } from "../../../hooks/awaitable";
import { parseMarkdown } from "../../../hooks/markdownParse";
import Loader from "../../atoms/Loader";
import "./style.css";

type Props = { className?: string; fetcher: () => Promise<string> };
function Markdown(props: Props) {
  const { result: html, valid } = useAwaitable(() =>
    props.fetcher().then(parseMarkdown)
  );
  if (!valid) return <Loader />;
  return (
    <div
      className={`${props.className} markdown-wrapper`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default Markdown;

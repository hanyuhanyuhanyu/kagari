import { useAwaitable } from "../../../hooks/awaitable";
import { parseMarkdown } from "../../../hooks/markdownParse";
import Loader from "../../atoms/Loader";
import "./style.css";

type Props = { text: string };
function Markdown(props: Props) {
  const { result: html, valid } = useAwaitable(parseMarkdown, props.text);
  if (!valid) return <Loader />;
  return (
    <div
      className="markdown-wrapper"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default Markdown;

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
  if (!valid) return <Loader />;
  return (
    <div
      className={`${props.className} markdown-wrapper`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default Markdown;

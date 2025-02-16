import { PencilIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import ButtonLink from "../atoms/ButtonLink";
import Title from "../atoms/Title";
import VLinedBox from "../atoms/RoundedBox";
import { articleApi } from "../../external_interface/http/backend/article";
import { useAwaitable } from "../../hooks/awaitable";
import { useState } from "react";

type Props = {
  className?: string;
};
function Articles(props: Props) {
  const {
    result: articles,
    loading,
    valid,
    reload,
  } = useAwaitable(articleApi.search);

  const sectionClass =
    "space-y-2 box-border" +
    (loading || !valid ? "overflow-hidden animate-pulse" : "");
  const [lastClick, setLastClick] = useState<string | null>(null);
  return (
    <VLinedBox className={`${props.className} space-y-2 overflow-y-auto`}>
      <Title
        right={
          <ArrowPathIcon
            onClick={reload}
            className={`size-6 hover:cursor-pointer hover:scale-120 transition-transform ${loading ? "animate-spin" : ""}`}
          />
        }
      >
        メモとか記事とか
      </Title>
      <section className={sectionClass}>
        {loading || !valid
          ? Array.from({ length: 5 }).map((_, i) => (
              <ButtonLink skelton={true} key={i} />
            ))
          : articles.map((a) => {
              const url = `/article/${encodeURIComponent(a.url)}`;
              return (
                <ButtonLink
                  className="text-nowrap whitespace-nowrap"
                  onClick={() => setLastClick(url)}
                  url={url}
                  key={a.url}
                  selected={lastClick === url}
                >
                  <PencilIcon className="size-5" />
                  <div className="text-ellipsis overflow-hidden">{a.title}</div>
                </ButtonLink>
              );
            })}
      </section>
    </VLinedBox>
  );
}
export default Articles;

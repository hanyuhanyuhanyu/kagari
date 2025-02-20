import type { Meta, StoryObj } from "@storybook/react";

import Markdown from "../src/components/organisms/Markdown";
import { useCallback, useEffect, useReducer, useState } from "react";
function MarkdownPreview({ src }: { src: string }) {
  const [autoReload, setAutoReload] = useState(false);
  const [rand, setRand] = useState(Math.random());
  const [scroll, setScroll] = useState(0);
  const [, update] = useReducer<NodeJS.Timeout | null, [() => NodeJS.Timeout]>(
    (state, action) => {
      if (state) clearInterval(state);
      state = action();
      return state;
    },
    null
  );
  const rawRel = useCallback(() => {
    setScroll(window.scrollY);
    setRand(Math.random());
  }, []);
  const rel = useCallback(() => {
    if (autoReload) {
      rawRel();
    }
  }, [rawRel, autoReload]);
  useEffect(() => {
    update(() => setInterval(rel, 6000));
  }, [rel, update]);
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          height: "2em",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => setAutoReload(!autoReload)}
          style={{
            backgroundColor: autoReload ? "blue" : "gray",
            height: "2em",
          }}
        >
          auto reload: {autoReload ? "enabled" : "disabled"}
        </button>
        <button onClick={rawRel}>reload</button>
      </div>
      <div
        className="overflow-auto"
        style={{
          top: "2em",
        }}
      >
        <Markdown
          key={rand}
          fetcher={() => fetch(`/${src}`).then((r) => r.text())}
          onRender={() => window.scrollTo(0, scroll)}
        />
      </div>
    </>
  );
}

const meta: Meta<typeof MarkdownPreview> = {
  component: MarkdownPreview,
};

export default meta;
type Story = StoryObj<typeof MarkdownPreview>;

export const _20250127: Story = {
  args: {
    src: "20250127.md",
  },
};
export const _20250219: Story = {
  args: {
    src: "20250219.md",
  },
};
export const _20250220: Story = {
  args: {
    src: "20250220.md",
  },
};

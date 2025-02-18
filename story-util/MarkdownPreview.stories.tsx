import type { Meta, StoryObj } from "@storybook/react";

import Markdown from "../src/components/organisms/Markdown";
import { useEffect, useState } from "react";
function MarkdownPreview({ src }: { src: string }) {
  const [text, setText] = useState<string>();
  useEffect(() => {
    fetch(`/${src}`)
      .then((r) => r.text())
      .then(setText);
  }, []);
  if (!text) return <></>;
  return (
    <div className="overflow-auto">
      <Markdown text={text} />
    </div>
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

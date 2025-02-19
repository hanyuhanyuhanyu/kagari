import type { Meta, StoryObj } from "@storybook/react";

import Markdown from "../src/components/organisms/Markdown";
function MarkdownPreview({ src }: { src: string }) {
  return (
    <div className="overflow-auto">
      <Markdown fetcher={() => fetch(`/${src}`).then((r) => r.text())} />
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
export const _20250219: Story = {
  args: {
    src: "20250219.md",
  },
};

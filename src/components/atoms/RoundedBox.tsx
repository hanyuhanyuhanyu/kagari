import { ReactNode } from "react";

function VLinedBox(props: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`${props.className} border-x-1 py-4 px-6 border-color-light`}
    >
      {props.children}
    </div>
  );
}
export default VLinedBox;

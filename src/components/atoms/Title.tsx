import { ReactNode } from "react";

function Title(props: { children: ReactNode; right?: ReactNode }) {
  return (
    <header className="flex place-content-between items-center pl-2 pb-1 border-l-8 text-2xl border-b border-color-light">
      {props.children}
      {props.right}
    </header>
  );
}
export default Title;

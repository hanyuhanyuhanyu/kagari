import { ReactNode } from "react";
import { Link } from "react-router";

type Props =
  | { skelton: true }
  | {
      className?: string;
      children: ReactNode;
      url: string;
      selected?: boolean;
      onClick?: () => unknown;
      skelton?: never;
    };
const baseBack = " bg-stone-700 ";
const className =
  " flex box-border items-center place-items-center border rounded-md py-1.5 px-3 ";
function ButtonLink(props: Props) {
  if (props.skelton) return <div className={className + baseBack}>&nbsp;</div>;
  return (
    <Link
      onClick={props.onClick}
      to={props.url}
      style={{ textDecoration: "none" }}
      className={
        `hover:bg-blue-900 hover:border-blue-600 transition ${props.selected ? "bg-blue-900 border-blue-600" : baseBack}` +
        ` ${props.className} ` +
        className
      }
    >
      {props.children}
    </Link>
  );
}
export default ButtonLink;

import { Link } from "react-router";

import GitHubSvg from "@assets/github-mark-white.svg";
function Header() {
  return (
    <header className="px-8 w-full text-3xl flex place-content-between border-b place-items-center bg-slate-950 ">
      <Link
        to="/"
        style={{
          textDecoration: "none",
        }}
      >
        🔥Bonfire Lit
      </Link>
      <a
        className="flex justify-center"
        href="https://github.com/hanyuhanyuhanyu"
        target="_blank"
      >
        <img src={GitHubSvg} className="size-8" />
      </a>
    </header>
  );
}
export default Header;

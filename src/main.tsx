import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// storybookで表示させる時に不都合な設定はweb.cssに隔離する
import "./web.css";
import App from "./App.tsx";

const root = createRoot(document.getElementById("root")!);
// s3 hostingでパスに#!がつくようにしてある
// 詳しくはここ https://via.studio/journal/hosting-a-reactjs-app-with-routing-on-aws-s3
const path = (/#!(\/?.*)$/.exec(location.hash) || [])[1];
if (path) history.replaceState(null, "", path);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

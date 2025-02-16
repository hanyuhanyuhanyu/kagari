import { lazy } from "react";
import { Route, Routes } from "react-router";
const Home = lazy(() => import("../pages/home.tsx"));
const Article = lazy(() => import("../pages/article/each.tsx"));

function RouterDefinition() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="article">
        <Route path=":url" element={<Article />} />
      </Route>
    </Routes>
  );
}
export default RouterDefinition;

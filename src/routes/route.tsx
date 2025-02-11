import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
const Home = lazy(() => import("./pages/index.tsx"));
const Article = lazy(() => import("./pages/article/each.tsx"));

function RouterDefinition() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="article">
          <Route path=":url" element={<Article />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default RouterDefinition;

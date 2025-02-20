import { BrowserRouter } from "react-router";
import VLinedBox from "./components/atoms/RoundedBox";
import Header from "./components/organisms/Header";
import Articles from "./components/organisms/List";
import RouterDefinition from "./routes/route";
const responsive = {
  articles: {
    "col-span-12": {
      "2xl": "col-span-3",
      xl: "col-span-4",
      lg: "col-span-5",
    },
    "row-span-12": {
      lg: "row-span-12",
    },
  },
  main: {
    "col-span-12": {
      "2xl": "col-span-9",
      xl: "col-span-8",
      lg: "col-span-7",
    },
    "row-span-9": {
      lg: "row-span-12",
    },
  },
};
function buildResponsiveClass(name: keyof typeof responsive) {
  const keys = Object.entries(responsive[name]);
  return keys
    .reduce((acc, [key, val]) => {
      acc.push(key, ...Object.entries(val).map(([k, v]) => `${k}:${v}`));
      return acc;
    }, [] as string[])
    .join(" ");
}
function App() {
  return (
    <BrowserRouter>
      <div className="grid grid-rows-[64px_calc(100vh-64px)] overflow-hidden h-full w-full">
        <Header />
        <div className="px-8 py-4 grid gap-4 grid-rows-12 grid-cols-12 box-border h-full">
          <Articles className={`${buildResponsiveClass("articles")}`} />
          <VLinedBox
            className={`${buildResponsiveClass("main")} h-full overflow-y-auto`}
          >
            <main className="h-full w-full">
              <RouterDefinition />
            </main>
          </VLinedBox>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter } from "react-router";
import VLinedBox from "./components/atoms/RoundedBox";
import Header from "./components/organisms/Header";
import Articles from "./components/organisms/List";
import RouterDefinition from "./routes/route";
function App() {
  return (
    <BrowserRouter>
      <div className="grid grid-rows-[64px_calc(100vh-64px)] overflow-hidden h-full w-full">
        <Header />
        <div className="px-8 py-4 grid gap-4 grid-rows-12 grid-cols-12 box-border h-full">
          <Articles className="col-span-12 lg:col-span-5 xl:col-span-4 2xl:col-span-3 row-span-3 lg:row-span-12" />
          <VLinedBox
            className={`col-span-12 lg:col-span-7 xl:col-span-8 2xl:col-span-9 row-span-9 lg:row-span-12 h-full overflow-y-auto`}
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

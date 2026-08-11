import React from "react";
import "./index.css";
import Head from "./components/Head";
import Body from "./components/Body";
import { createHashRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import store from "./utils/store";
import Shorts from "./components/Shorts";

const appRouter = createHashRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        index: true,
        element: <MainContainer />,
      },
      {
        path: "search",
        element: <MainContainer />,
      },
      {
        path: "watch/:videoId",
        element: <WatchPage />,
      },
      {
        path: "shorts",
        element: <Shorts />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="bg-black">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;

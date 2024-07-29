import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import MainChat from "./pages/MainChat/MainChat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/chat",
    element: <MainChat />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

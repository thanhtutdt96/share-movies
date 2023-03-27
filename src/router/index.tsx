import { createBrowserRouter } from "react-router-dom";
import MainLayout from "layout/MainLayout";
import Home from "pages/index";
import ShareMovie from "pages/share-movie";
import PrivateRoute from "router/PrivateRoute";

const childrenRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/share",
    element: <PrivateRoute element={<ShareMovie />} />,
  },
];

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [...childrenRoutes],
  },
];

const router = createBrowserRouter(routes);

export default router;

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "layout/MainLayout";
import Home from "pages/index";
import ListMovies from "pages/list-movies";
import ShareMovie from "pages/share-movie";

const childrenRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/share-movie",
    element: <ShareMovie />,
  },
  {
    path: "/list-movies",
    element: <ListMovies />,
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

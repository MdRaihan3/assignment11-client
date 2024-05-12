import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root";
import Home from "../pages/Home/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import AddFood from "../pages/AddFood/AddFood";
import PrivateRoutes from "./PrivateRoutes";
import ViewDetails from "../pages/viewDetails/ViewDetails";
import AvailableFoods from "../pages/avaialableFood/AvailableFoods";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/add',
        element: <PrivateRoutes><AddFood></AddFood></PrivateRoutes>
      },
      {
        path: '/availableFoods',
        element: <AvailableFoods></AvailableFoods>
      },
      {
        path: '/viewDetails/:id',
        element: <PrivateRoutes><ViewDetails></ViewDetails></PrivateRoutes>,
        loader: ({ params }) => fetch(`http://localhost:5000/food/${params.id}`)
      }
    ]
  },
]);

export default router
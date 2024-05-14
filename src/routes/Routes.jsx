import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root";
import Home from "../pages/Home/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import AddFood from "../pages/AddFood/AddFood";
import PrivateRoutes from "./PrivateRoutes";
import ViewDetails from "../pages/viewDetails/ViewDetails";
import AvailableFoods from "../pages/avaialableFood/AvailableFoods";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ManageMyFoods from "../pages/Manage My Foods/ManageMyFoods";
import Update from "../pages/Update/Update";
import MyFoodRequest from "../pages/MyFoodRequest/MyFoodRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
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
      },
      {
        path: '/manage',
        element: <PrivateRoutes><ManageMyFoods></ManageMyFoods></PrivateRoutes>
      },
      {
        path: '/update/:id',
        element: <Update></Update>,
        loader: ({params}) => fetch(`http://localhost:5000/food/${params?.id}`)
      },
      {
        path: '/myRequest',
        element: <PrivateRoutes><MyFoodRequest></MyFoodRequest></PrivateRoutes>
      }
    ]
  },
]);

export default router
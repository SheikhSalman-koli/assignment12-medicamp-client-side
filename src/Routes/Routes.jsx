import { createBrowserRouter } from "react-router";
import RootLayout from "../LayOut/RootLayout";
import Home from "../Pages/Home/Home";
import Signin from "../Pages/Authentication/Signin";
import Signup from "../Pages/Authentication/Signup";
import DashBoardLayout from "../LayOut/DashBoardLayout";
import DashHome from "../Pages/DashBoard/DashHome";


export const routes = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            }
        ]
    },
    {
        path: 'signin',
        Component: Signin
    },
    {
        path: 'signup',
        Component: Signup
    },
    {
        path: 'dashboard',
        Component: DashBoardLayout,
        children: [
            {
                index: true,
                Component: DashHome
            }
        ]
    }

])
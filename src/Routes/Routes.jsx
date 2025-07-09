import { createBrowserRouter } from "react-router";
import RootLayout from "../LayOut/RootLayout";
import Home from "../Pages/Home/Home";
import Signin from "../Pages/Authentication/Signin";
import Signup from "../Pages/Authentication/Signup";


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
    }
   
])
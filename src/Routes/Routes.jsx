import { createBrowserRouter } from "react-router";


export const routes = createBrowserRouter([
    {
        path: '/',
        element: <p>hello</p>
    },
    {
        path: 'sign',
        element: <p>sign in</p>
    }
])
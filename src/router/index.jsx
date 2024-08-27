import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/auth/LogIn/Login";
import { NotFound } from "../pages/notFount";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/',
        errorElement: <NotFound />,
        element: <Login />
    }
])
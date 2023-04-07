import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Users from "../pages/Users/Users";
import AddUser from "../pages/AddUser/AddUser";

export const router = createBrowserRouter([{
    path: "/",
    element: <MainLayout />,
    children: ([
        {
            path: "/",
            element: <Users />
        },
        {
            path: "add-user",
            element: <AddUser />
        }
    ])
}])
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { ReactNode } from "react";
import App from "../App";
import About from "../components/About";
import User from "../components/User";
import Form from "../components/Form";
import StudentList from "../components/StudentList";


const routes: RouteObject[] = [
    {
		path: '/',
		element: <StudentList />,
		children: [
			{
				path: '/about',
				element: <About />
			},
			{
				path: '/user/:id',
				element: <User />
			},
			{
				path: '/form',
				element: <Form />
			},
		]
	}
];

export const router = createBrowserRouter(routes);
import { createBrowserRouter, RouteObject } from "react-router-dom";
import About from "../components/About";
import Student from "../components/Student";
import Form from "../components/Form";
import StudentList from "../components/StudentList";
import Holder from "../components/Holder";


const routes: RouteObject[] = [
    {
		path: '/',
		element: <Holder />,
		children: [
            {
                path: '/',
                element: <StudentList />
            },
			{
				path: '/about',
				element: <About />
			},
			{
				path: '/student/:id',
				element: <Student />
			},
			{
				path: '/form',
				element: <Form />
			},
		]
	}
];

export const router = createBrowserRouter(routes);
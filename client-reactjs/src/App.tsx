import { Center, Container, Table, TableContainer, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './utils/router';

function App() {
	return <RouterProvider router={router} />;
}

export default App

import { Container, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react'
import { getAllStudents } from './utils/api';
import { StudentContext } from './utils/context';

function App() {

	const {studentsList, setStudentsList}:any = useContext(StudentContext);

	useEffect(() => {
		// setStudentsList([])
		// console.log('list',studentsList)
	  	console.log('App component startup render')
		getAllStudents();
	},[]);
	
	return (
		<Container>
			<Text fontSize={'3xl'}>Rust + React application for School Administration System</Text>
		</Container>
	);
}

export default App

import { Container, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react'
import { getAllStudents } from './utils/api';
import { StudentContext } from './utils/context';
import { StudentContextType, StudentType, StudentsRespSchema } from './utils/model';

function App() {

	const { studentsList, setStudentsList }: StudentContextType = useContext(StudentContext);
	useEffect(() => {
		setStudentsList([])
		console.log('App component startup render')
		getAllStudents().then((students: StudentsRespSchema) => {
			setStudentsList(students.data);
			// students.data.
			// console.log('Data:', students.data);
		});

	}, []);

	return (
		<Container>
			<Text fontSize={'3xl'}>Rust + React application for School Administration System</Text>
			{
				studentsList.map((student: StudentType, idx: number) => {
					return (
						<Text key={idx}>{student.name}</Text>
					)
				})
			}
		</Container>
	);
}

export default App

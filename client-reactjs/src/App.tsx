import { Center, Container, Table, TableContainer, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
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
			// console.log('Data:', students.data);

			// students.data.forEach((student: StudentType) => {
			// 	console.log('Student:', new Date(parseInt(student.createdAt.$date.$numberLong)));
			// });
		});

	}, []);

	return (
		<>
		 {/* <Container> */}
		 <Center>
			<Text fontSize={'3xl'}>Rust + React application for School Administration System</Text>
		 </Center>
			<TableContainer>
				<Table>
					<Thead>
						<Tr>
							<Th>Name</Th>
							<Th>UID</Th>
							<Th>Enrolled</Th>
						</Tr>
					</Thead>
					<tbody>
						{
							studentsList.map((student: StudentType, idx: number) => {
								return (
									<Tr key={idx}>
										<Td>{student.name}</Td>
										<Td>{student.uid}</Td>
										<Td>{student.enrolled ? 'Yes' : 'No'}</Td>
									</Tr>
								)
							})
						}
					</tbody>
				</Table>
			</TableContainer>
			{/* </Container> */}
			</>
	);
}

export default App

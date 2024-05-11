import { Table, TableContainer, Th, Thead, Tr, Td, Button } from '@chakra-ui/react';
import { useContext, useEffect } from 'react'
import { StudentContextType, StudentType, StudentsRespSchema } from '../utils/model';
import { getAllStudents } from '../utils/api';
import { StudentContext } from '../utils/context';
import { Link } from 'react-router-dom';

const StudentList = () => {
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
        <TableContainer>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>UID</Th>
                        <Th>Enrolled</Th>
                        <Th>Actions</Th>
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
                                    <Td>
                                        <Link to={`/student/${student.id}`}>
                                            <Button
                                                colorScheme={'blue'}
                                                variant={'ghost'}
                                            >
                                                View
                                            </Button>
                                        </Link>
                                    </Td>
                                </Tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </TableContainer>
    )
}

export default StudentList;
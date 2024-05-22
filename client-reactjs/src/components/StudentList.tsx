import { Table, TableContainer, Th, Thead, Tr, Td, Button, Box, Flex, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react'
import { StudentContextType, StudentType, StudentsRespSchema } from '../utils/model';
import { deleteStudent, getAllStudents } from '../utils/api';
import { StudentContext } from '../utils/context';
import { Link } from 'react-router-dom';

const StudentList = () => {
    const { studentsList, setStudentsList, page, setPage, limit, setLimit }: StudentContextType = useContext(StudentContext);

    const [nextPageStudents, setNextPageStudents] = useState<StudentType[]>([]);

    const [showAlert, setShowAlert] = useState(false);
	const [passed, setPassed] = useState(false);

    useEffect(() => {
        setStudentsList([])
        console.log('App component startup render')
        getAllStudents(page, limit).then((students: StudentsRespSchema) => {
            setStudentsList(students.data);
        });
        getAllStudents(page + 1, limit).then((students: StudentsRespSchema) => {
            console.log('Next Page: students.data :>> ', students.data.length);
            setNextPageStudents(students.data);
        });
    }, [page, limit]);

    const handleDeleteStudent = (id: string) => {
        deleteStudent(id).then(res => {

            console.log('Delete Response:', res);

            if (res?.status && res?.status == 200) {
                setPassed(true);
                // setShowAlert(true);
            } else {
                setPassed(false);
            }
            setShowAlert(true);

            /// LOCALLY SETTING THE STATE AFTER DELETION
            setStudentsList(studentsList.filter((student: StudentType) => student.id !== id));

            /// FETCHING DATA FROM SERVER AFTER DELETION
            // getAllStudents(page, limit).then((students: StudentsRespSchema) => {
            //     setStudentsList(students.data);
            // });
        }).catch(err => {
            console.error('Error:', err);
        });
    };
    return (
        <Box>
            {showAlert && (
                <Alert status={passed ? "success" : "error"}>
                    <AlertIcon />
                    {passed ? "Student has been deleted!" : "Student not deleted!"}
                </Alert>
            )}
            <Flex justifyContent={'center'} alignItems={'center'} p={2}>
                <Button width={100} onClick={() => setPage(page - 1)} isDisabled={(page <= 1) ? true: false}>Previous</Button>
                <Text fontWeight={'bold'} ml={4} mr={4}>{page}</Text>
                <Button width={100} onClick={() => setPage(page + 1)} isDisabled={nextPageStudents.length == 0}>Next</Button>
            </Flex>
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
                                            <Button
                                                colorScheme='red'
                                                variant={'ghost'}
                                                onClick={() => handleDeleteStudent(student.id)}
                                            >
                                                Delete
                                            </Button>
                                        </Td>
                                    </Tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default StudentList;
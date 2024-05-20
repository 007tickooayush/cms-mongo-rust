import { Table, TableContainer, Th, Thead, Tr, Td, Button, Box, Flex, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react'
import { StudentContextType, StudentType, StudentsRespSchema } from '../utils/model';
import { getAllStudents } from '../utils/api';
import { StudentContext } from '../utils/context';
import { Link } from 'react-router-dom';

const StudentList = () => {
    const { studentsList, setStudentsList, page, setPage, limit, setLimit }: StudentContextType = useContext(StudentContext);

    const [nextPageStudents, setNextPageStudents] = useState<StudentType[]>([]);

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
    return (
        <Box>
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
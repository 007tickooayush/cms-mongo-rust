import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getStudent } from '../utils/api';
import { StudentBodySchema } from '../utils/model';
import { Box, Button, Center, Flex, SimpleGrid } from '@chakra-ui/react';
import Form from './Form';

const User = () => {
    const [student, setStudent] = useState<StudentBodySchema>({ name: '', uid: '', enrolled: false });
    const { id, ...params }: any = useParams<string>();

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        getStudent(id).then((res) => {

            setStudent(res.data.student);
            console.log('Response:', res.data.student);
        }).catch((err) => {
            console.error('Error:', err);
        });
        console.log(id);
    }, []);

    return (
        <Box>
            <Center m={4}>
                <Button 
                    onClick={() => setIsEdit(e => !e)}
                    colorScheme={isEdit ? 'red' : 'blue'}
                    variant='outline'
                    width={100}
                >
                    {isEdit ? 'Cancel' : 'Edit'}
                </Button>
            </Center>
            {
                isEdit ? 
                (
                    <Form studentId={id} studentFormData={student} isEdit={isEdit} />
                )
                :
                (
                <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} m={4}>
                    <SimpleGrid columns={2} spacing={4}>
                        <Flex justifyContent={'space-between'}>
                            <Box width="200px">
                                Student UID
                            </Box>
                            <Box>
                                :
                            </Box>
                        </Flex>
                        <Box width="200px">
                            {student.uid}
                        </Box>
                    </SimpleGrid>
                    <SimpleGrid columns={2} spacing={4}>
                        <Flex justifyContent={'space-between'}>
                            <Box width="200px">
                                Student Name
                            </Box>
                            <Box>
                                :
                            </Box>
                        </Flex>
                        <Box width="200px">
                            {student.name}
                        </Box>
                    </SimpleGrid>
                    <SimpleGrid columns={2} spacing={4}>
                        <Flex justifyContent={'space-between'}>
                            <Box width="200px">
                                Enrolled
                            </Box>
                            <Box>
                                :
                            </Box>
                        </Flex>
                        <Box width="200px">
                            {student.enrolled ? 'Yes' : 'No'}
                        </Box>
                    </SimpleGrid>
                </Flex>
                )
            }
        </Box>

    )
}

export default User;
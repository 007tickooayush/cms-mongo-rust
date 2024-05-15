import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getStudent } from '../utils/api';
import { StudentBodySchema } from '../utils/model';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';

const User = () => {
    const [student, setStudent] = useState<StudentBodySchema>({ name: '', uid: '', enrolled: false });
    const { id, ...params }: any = useParams<string>();

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
        <Flex justifyContent={'space-around'} alignItems={'center'} flexDirection={'column'} m={4}>
            <SimpleGrid columns={2} spacing={4}>
                <Box>
                    Student UID:
                </Box>
                <Box>
                    {student.uid}
                </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={4}>
                <Box>
                    Student name:
                </Box>
                <Box>
                    {student.name}
                </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={4}>
                <Box>
                    Student enrolled:
                </Box>
                <Box>
                    {student.enrolled ? 'Yes' : 'No'}
                </Box>
            </SimpleGrid>
        </Flex>
    )
}

export default User;
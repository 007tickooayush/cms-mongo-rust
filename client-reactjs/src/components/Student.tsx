import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getStudent } from '../utils/api';
import { StudentBodySchema } from '../utils/model';
import { Box, Flex } from '@chakra-ui/react';

const User = () => {
    const [student, setStudent] = useState<StudentBodySchema>({ name: '', uid: '', enrolled: false});
    const { id, ...params }: any = useParams<string>();

    useEffect(() => {
        getStudent(id).then((res) => {

            setStudent(res.data.student);
            console.log('Response:', res.data.student);
        }).catch((err) => {
            console.error('Error:', err);
        });
        console.log(id);
    },[]);

    return (
        <Flex justifyContent={'space-around'} alignItems={'center'} flexDirection={'column'}>
            <Box>
                Student id: {id}
            </Box>
            <Box className="">
                Student name: {student.name}
            </Box>
            <Box>
                Student UID: {student.uid}
            </Box>
            <Box>
                Student enrolled: {student.enrolled ? 'Yes' : 'No'}
            </Box>
        </Flex>
    )
}

export default User;
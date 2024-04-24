import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getStudent } from '../utils/api';
import { StudentBodySchema } from '../utils/model';

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
        <div>
            Student id: {id}
            <div className="">
                Student name: {student.name}
            </div>
        </div>
    )
}

export default User;
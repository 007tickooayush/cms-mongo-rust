import React, { FormEvent, useEffect, useId, useState } from 'react'
import { EditStudentBodySchema, StudentBodySchema } from '../utils/model';
import { Alert, AlertIcon, Button, Container, FormControl, FormLabel, HStack, Input, Radio, RadioGroup, Select, VStack } from '@chakra-ui/react';
import { createStudent, editStudent } from '../utils/api';

const Form = ({ studentId, studentFormData, isEdit }: EditStudentBodySchema) => {
	const id = useId();
	const [formData, setFormData] = useState<StudentBodySchema>({ name: 'Random Student', uid: id.replaceAll(':', ''), enrolled: false });
	const [showAlert, setShowAlert] = useState(false);
	const [passed, setPassed] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const form: any = e.target;
		const formObj = new FormData(form);
		const data: any = Object.fromEntries(formObj.entries());

		console.log('Form State:', data);
		if (isEdit) {
			handleEdit(data);
		} else {
			handleCreate(data);
		}

	};
	const handleCreate = (data: any) => {
		createStudent({ ...data, enrolled: data.enrolled === 'true' ? true : false }).then((res) => {
			console.log('Create Response:', res);

			if (res?.status && res?.status == 201) {
				setPassed(true);
				// setShowAlert(true);
			} else {
				setPassed(false);
			}
			setShowAlert(true);
		}).catch((err) => {
			console.error('Error:', err);
		});
	};
	const handleEdit = (data: any) => {
		editStudent(studentId, { ...data, enrolled: data.enrolled === 'true' ? true : false }).then((res) => {
			console.log('Edit Response:', res);
		}).catch((err) => {
			console.error('Error:', err);
		});
	}
	useEffect(() => {
		if (isEdit) {
			setFormData(studentFormData);
		}
	}, []);

	return (
		<div>
			<Container>
				{showAlert && (
					<Alert status={passed ? "success" : "error"}>
						<AlertIcon />
						{passed ? "Student has been created!" : "Student not created!"}
					</Alert>
				)}
				<form onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
					<FormControl>
						<FormLabel htmlFor="name">Name:</FormLabel>
						<Input type="text" name="name" id="name" placeholder='enter your name' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

						<FormLabel htmlFor="uid">UID:</FormLabel>
						<Input type="text" name="uid" id="uid" placeholder='enter your uid' value={formData.uid} onChange={(e) => setFormData({ ...formData, uid: e.target.value })} />


						<FormLabel htmlFor="enrolled">Enrolled:</FormLabel>
						<RadioGroup name="enrolled" id="enrolled" defaultValue='false' value={String(formData.enrolled)} onChange={(e) => setFormData({ ...formData, enrolled: Boolean(e) })}>
							<HStack spacing={4} direction="row">
								<Radio name="enrolled" id="enrolled" value="true"> true </Radio>
								<Radio name="enrolled" id="enrolled" value="false"> false</Radio>
							</HStack>
						</RadioGroup>
						{/* <Select name="enrolled" id="enrolled">
							<option value="true">true</option>
							<option value="false">false</option>
						</Select> */}
					</FormControl>

					<Button mt={4} type='submit'>Submit</Button>
				</form>
			</Container>
		</div>
	)
}

export default Form;
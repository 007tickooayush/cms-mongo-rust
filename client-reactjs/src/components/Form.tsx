import React, { FormEvent, useEffect, useState } from 'react'
import { StudentBodySchema } from '../utils/model';
import { Button, Center, Container, FormControl, FormLabel, HStack, Input, Radio, RadioGroup, Select, VStack } from '@chakra-ui/react';
import { createStudent } from '../utils/api';



const Form = () => {
	// const [formData, setFormData] = useState<StudentBodySchema>({ name: '', uid: '', enrolled: false });

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const form: any = e.target;
		const formObj = new FormData(form);
		const data:any = Object.fromEntries(formObj.entries());
		
		createStudent({...data, enrolled: data.enrolled === 'true' ? true : false}).then((res) => {
			console.log('Response:', res);
		}).catch((err) => {
			console.error('Error:', err);
		});

		console.log('Form State:', data);

	};

	return (
		<div>
			<Container>
				<form onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
					<FormControl>
						<FormLabel htmlFor="name">Name:</FormLabel>
						<Input type="text" name="name" id="name" placeholder='enter your name' />

						<FormLabel htmlFor="uid">UID:</FormLabel>
						<Input type="text" name="uid" id="uid" placeholder='enter your uid' />


						<FormLabel htmlFor="enrolled">Enrolled:</FormLabel>
						<RadioGroup name="enrolled" id="enrolled">
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
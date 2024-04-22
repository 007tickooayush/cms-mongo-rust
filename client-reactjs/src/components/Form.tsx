import React, { useState } from 'react'

const Form = () => {
	const [formData, setFormData] = useState({});
	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		const formObj = new FormData(form);
		const data = Object.fromEntries(formObj.entries());
        
		setFormData(data);
		console.log('Form Data:',data)
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Name</label>
				<input type="text" placeholder="enter name" name='name'/>

				<select name="options" id="options">
					<option value="lab">lab</option>
					<option value="practical">practical</option>
				</select>

				<label htmlFor="mern">Mern Technology</label>
				<input type="checkbox" name="tech-mern" id="mern" />
				<label htmlFor="java">Java technology</label>
				<input type="checkbox" name="tech-java" id="java" />

				<label htmlFor="file">File upload</label>
				<input type="file" name="file" id="file" />

				<button type="submit">Submit</button>
			</form>
			<div>
                form data is:
				{
					formData.name
				}
			</div>
		</div>
	)
}

export default Form;
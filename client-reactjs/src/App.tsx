import { Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react'

function App() {

	useEffect(() => {
	  console.log('App component startup render')
	});
	
	return (
		<Container>
			<h1>Rust + React application for School Administration System</h1>
		</Container>
	);
}

export default App

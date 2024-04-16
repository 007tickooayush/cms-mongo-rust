import { Container, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react'

function App() {

	useEffect(() => {
	  console.log('App component startup render')
	});
	
	return (
		<Container>
			<Text fontSize={'3xl'}>Rust + React application for School Administration System</Text>
		</Container>
	);
}

export default App

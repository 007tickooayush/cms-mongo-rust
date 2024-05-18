import { Box, Container, Flex, Text } from '@chakra-ui/react';
import React from 'react'

const About = () => {
	return (
		<Container>
			<Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'} m={4} height={400}>
				<Box mb={10}>
					<Text fontSize={'2xl'}>About the project</Text>
				</Box>
				<Box mb={10}>
					<Text fontSize={'lg'} textAlign={'center'}>This project is a simple CRUD application that allows you to create, read, update, and delete student records. It is built using RUST (using dependencies Axum, Mongo DB, Tokio, Serde Json) for REST API Server, and frontend is built using React</Text>
				</Box>
				<Box fontSize={'lg'} textAlign={'center'}>
					The REST API server built using RUST provides with record breaking response time, negligible latency, and high throughput.
				</Box>
			</Flex>
		</Container>
	)
}

export default About;
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Center, ChakraProvider, Container, Text } from '@chakra-ui/react'
import Root from './Root'
import { setUrl, urlList } from './utils/api'

setUrl().then(async (connected: any) => {
	console.log('Connecting to server');
	if (!connected) {
		console.log('Error while connecting to server connected:', connected);
		ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
			<>
				<ChakraProvider>
					<Root>
						<Container>
							<Center>
								<Text size={'3xl'}>Unable to connect to server</Text>
							</Center>
						</Container>
					</Root>
				</ChakraProvider>
			</>,
		)
	} else {
		ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
			<>
				<ChakraProvider>
					<Root>
						<App />
					</Root>
				</ChakraProvider>
			</>,
		)
	}
}).catch((err: any) => {
	console.error('Error while connect api server mount:', err.toString());
});

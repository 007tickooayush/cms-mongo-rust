import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import Root from './Root'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
  	<ChakraProvider>
		<Root>
			<App />
		</Root>
  	</ChakraProvider>
  </>,
)

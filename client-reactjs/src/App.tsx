import { useEffect, useState } from 'react'

function App() {

	useEffect(() => {
	  console.log('App component startup render')
	});
	
	return (
		<div>
			<h1>Rust + React application for School Administration System</h1>
		</div>
	);
}

export default App

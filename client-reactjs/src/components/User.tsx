import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
const User = () => {
    const { id, ...params } = useParams();

    useEffect(() => {
        console.log(id);
    });

	return (
		<div>User id: {id}</div>
	)
}

export default User;
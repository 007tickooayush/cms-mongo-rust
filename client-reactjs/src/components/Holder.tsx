import { Box, Flex, Text } from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';

const Holder = () => {
    return (
        <Box>
            <Flex bg="gray.200" p={4} justify="space-between" align="center">
                <Flex justify={'space-between'} align={'center'}>
                    <Box mr={4}>
                        <Link to="/">
                            Home
                        </Link>
                    </Box>
                    <Box mr={4}>
                        <Link to="/about">
                            About
                        </Link>
                    </Box>
                    <Box>                
                        <Link to="/form">
                            Create1
                        </Link>
                    </Box>
                </Flex >
                <Text>Logo</Text>
            </Flex>
            <Outlet />
        </Box>
    )
}

export default Holder;
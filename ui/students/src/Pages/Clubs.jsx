import React from 'react'

const Clubs = () => {
    return (
        <Flex direction={["column", "column"]} alignItems="center" mt="40px">
            <Button w="200px" mt="25px" onClick={() => navigate('/subcribed-clubs')}>Subscribed Clubs</Button>
            <Button w="200px" mt="25px" onClick={() => navigate('/search-clubs')}>Search Clubs</Button>
        </Flex>
    )
}

export default Clubs
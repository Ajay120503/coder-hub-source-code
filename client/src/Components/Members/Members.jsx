import { Box, Text } from '@chakra-ui/react';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import { FaCrown } from 'react-icons/fa'; // Import the crown icon

function Members({ clients, admin, }) {
    // Function to format the joined timestamp to include seconds
    const formatDate = (dateString) => {
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(dateString).toLocaleTimeString(undefined, options);
    };

    // Sort clients, putting the admin first, then sorting others alphabetically
    const sortedClients = [...clients].sort((a, b) => {
        if (a.username === admin) return -1; // Admin comes first
        if (b.username === admin) return 1;  // Admin comes first
        return a.username.localeCompare(b.username); // Sort alphabetically
    });

    return (
        <Box>
            {sortedClients.length === 0 ? (
                <Text fontFamily='monospace' color='#fff'>No members in the room</Text>
            ) : (
                sortedClients.map((client) => (
                    <Box
                        key={client.socketId}
                        py={1}
                        px={3}
                        color='#fff'
                        display='flex'
                        alignItems='center'
                    >
                        <Avatar
                            round='50%'
                            size={38}
                            name={client.username}
                            aria-label={client.username}
                        />
                        <Box px={2} lineHeight='12px'>
                            <Text
                                color={client.username === admin ? '#bb86fc' : '#fff'}
                                fontWeight={client.username === admin ? 'bold' : 'normal'}
                                display='flex' // Use inline-flex to align icon properly
                                alignItems='center' // Center align text and icon vertically
                            >
                                {client.username.toUpperCase()}
                                {client.username === admin && (
                                    <sup>
                                        <FaCrown style={{ marginLeft: '5px', color: 'gold' }} />
                                    </sup>
                                )}
                            </Text>
                            <Text as='span' fontSize='10px' color='gray.400'>
                                {formatDate(client.joinedAt)}
                            </Text>
                        </Box>
                    </Box>
                ))
            )}
        </Box>
    );
}

Members.propTypes = {
    clients: PropTypes.arrayOf(
        PropTypes.shape({
            socketId: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            joinedAt: PropTypes.string.isRequired,
        })
    ).isRequired,
    admin: PropTypes.string, // Ensure you define the type for admin
};

export default Members;

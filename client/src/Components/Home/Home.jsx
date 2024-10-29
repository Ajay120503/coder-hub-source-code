import { useState } from 'react';
import { Button, Box, TextField, Grid, Typography, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
        },
        primary: {
            main: '#bb86fc',
        },
        secondary: {
            main: '#cf6679',
        },
        action: {
            active: '#ffffff',
            hover: '#333333',
        },
    },
});

function Home() {
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const handleCreateRoom = (e) => {
        e.preventDefault();
        const newRoomId = uuidv4();
        setRoomId(newRoomId);
        toast({
            description: `Room ID is Created`,
            status: 'success',
            duration: 3000,
            isClosable: false,
            position: 'top',
        });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (roomId && username) {
            navigate(`/editor/${roomId}`, {
                state: {
                    username
                },
            });
            toast({
                description: "Welcome in the CODER HUB Room.",
                status: 'success',
                duration: 3000,
                isClosable: false,
                position: 'top'
            });
        } else {
            toast({
                description: "Both fields are Required.",
                status: 'error',
                duration: 3000,
                isClosable: false,
                position: 'top'
            });
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box
                height='100vh'
                width='100%'
                display='flex'
                justifyContent='center'
                alignItems='center'
                bgcolor='background.default'
            >
                <Grid container justifyContent='center' alignItems='center'>
                    <Grid item xs={10} sm={8} md={6} lg={4}>
                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
                            autoComplete="on"
                            padding='10px'
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            flexDirection='column'
                            bgcolor='background.paper'
                            borderRadius={2}
                            boxShadow={3}
                            onSubmit={handleSubmitForm}
                        >
                            <Typography
                                variant="h4"
                                color='text.primary'
                                textAlign='center'
                                mb={4}
                                fontWeight='500'
                            >
                                <i style={{ margin: '0px 5px', color: '#cf6679' }} className="fa-solid fa-laptop"></i>
                                CODER<span style={{ color: '#bb86fc', fontWeight: 700, letterSpacing: '10px' }}>{' '}HUB</span>
                            </Typography>
                            <TextField
                                id="room-id"
                                label="Enter Room ID (OR Type Manually)"
                                variant="filled"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                                InputProps={{ style: { color: '#ffffff' } }}
                                InputLabelProps={{ style: { color: '#b0b0b0' } }}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                id="username"
                                label="Enter Username"
                                variant="filled"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                InputProps={{ style: { color: '#ffffff' } }}
                                InputLabelProps={{ style: { color: '#b0b0b0' } }}
                                sx={{ mb: 2 }}
                            />
                            <Box display='flex' justifyContent='space-evenly' alignItems='center'>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Join Room
                                </Button>
                                <Button
                                    type="button"
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleCreateRoom}
                                >
                                    Generate Room ID
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                {/* Custom Footer */}
                <Typography
                    variant="body2"
                    textAlign='center'
                    position='absolute'
                    bottom='20px'
                    fontWeight={400} // Slightly bold
                    fontSize="0.9rem" // Increase the font size
                    color='primary.main'
                >
                    @ Created by
                    <span style={{ color: '#cf6679', marginLeft: '5px', cursor: 'pointer' }}>
                        | ❤️ | Ajay Ganesh Kandhare
                    </span>
                </Typography>
            </Box>
        </ThemeProvider>
    );
}

export default Home;

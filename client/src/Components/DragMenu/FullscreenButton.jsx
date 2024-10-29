import { useState, useEffect } from 'react';
import { Button, useToast, Icon } from '@chakra-ui/react';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md'; // Icons from react-icons

const FullscreenButton = () => {
    const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);
    const toast = useToast(); // Chakra UI toast hook

    const handleFullscreenToggle = () => {
        if (!isFullscreen) {
            document.documentElement.requestFullscreen().then(() => {
                toast({
                    title: 'Entered fullscreen mode.',
                    status: 'success',
                    duration: 1000,
                    isClosable: true,
                    position: 'bottom-right'
                });
            }).catch(err => {
                toast({
                    title: `Failed to enter fullscreen mode: ${err.message}`,
                    status: 'error',
                    duration: 1000,
                    isClosable: true,
                    position: 'bottom-right'
                });
            });
        } else {
            document.exitFullscreen().then(() => {
                toast({
                    title: 'Exited fullscreen mode.',
                    status: 'success',
                    duration: 1000,
                    isClosable: true,
                    position: 'bottom-right'
                });
            }).catch(err => {
                toast({
                    title: `Failed to exit fullscreen mode: ${err.message}`,
                    status: 'error',
                    duration: 1000,
                    isClosable: true,
                    position: 'bottom-right'
                });
            });
        }
    };

    useEffect(() => {
        const fullscreenChangeHandler = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', fullscreenChangeHandler);
        return () => {
            document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
        };
    }, []);

    return (
        <Button
            size='sm'
            colorScheme='teal'
            padding='0px'
            onClick={handleFullscreenToggle}
        >
            {isFullscreen ? <Icon as={MdFullscreenExit} boxSize={6} /> : <Icon as={MdFullscreen} boxSize={6} />}
        </Button>
    );
};

export default FullscreenButton;

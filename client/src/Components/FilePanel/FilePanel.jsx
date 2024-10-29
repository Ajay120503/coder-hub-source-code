import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, List, ListItem, useDisclosure, useToast, Tooltip, Spinner, Text, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter } from '@chakra-ui/react';
import { FaFileAlt, FaTrash, FaEdit, FaSync } from 'react-icons/fa';
import debounce from 'lodash.debounce';

function FilePanel({ editorContent, onFileChange }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [files, setFiles] = useState([]);
    const [newFileName, setNewFileName] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [renameFile, setRenameFile] = useState(null); // For renaming
    const [renameFileName, setRenameFileName] = useState('');
    const toast = useToast();

    // Define saveFile with debounce
    const saveFile = useCallback(debounce(() => {
        if (!newFileName.trim()) {
            toast({ description: 'File name is required', status: 'warning', duration: 3000, isClosable: false });
            return;
        }

        const key = `file-${newFileName.trim()}`;
        if (localStorage.getItem(key)) {
            toast({ description: 'File with this name already exists', status: 'warning', duration: 3000, isClosable: false });
            return;
        }

        setIsSaving(true);
        localStorage.setItem(key, editorContent);
        setFiles(prevFiles => [...prevFiles, key]);
        setNewFileName('');
        toast({ description: 'File saved', status: 'success', duration: 3000, isClosable: false });
        setIsSaving(false);
    }, 1000), [editorContent, newFileName, toast]);

    // Define handleDeleteFile with useCallback
    const handleDeleteFile = useCallback((fileName) => {
        localStorage.removeItem(fileName);
        setFiles(prevFiles => prevFiles.filter(file => file !== fileName));
        toast({ description: 'File deleted', status: 'success', duration: 3000, isClosable: false });
    }, [toast]);

    // Define handleOpenFile with useCallback
    const handleOpenFile = useCallback((fileName) => {
        const fileContent = localStorage.getItem(fileName);
        onFileChange(fileContent);
        onClose();
    }, [onFileChange, onClose]);

    // Define handleUpdateFile with useCallback
    const handleUpdateFile = useCallback((fileName) => {
        localStorage.setItem(fileName, editorContent);
        toast({ description: 'File updated', status: 'success', duration: 3000, isClosable: false });
    }, [editorContent, toast]);

    // Handle rename file
    const handleRenameFile = useCallback(() => {
        const trimmedRenameFileName = renameFileName.trim();
        if (!trimmedRenameFileName) {
            toast({ description: 'New file name is required', status: 'warning', duration: 3000, isClosable: false });
            return;
        }

        const newKey = `file-${trimmedRenameFileName}`;
        if (localStorage.getItem(newKey) && newKey !== renameFile) {
            toast({ description: 'File with this name already exists', status: 'warning', duration: 3000, isClosable: false });
            return;
        }

        try {
            // Rename file in local storage
            const content = localStorage.getItem(renameFile);
            if (content) {
                localStorage.removeItem(renameFile);
                localStorage.setItem(newKey, content);

                setFiles(prevFiles => prevFiles.map(file => file === renameFile ? newKey : file));
                setRenameFile(null);
                setRenameFileName('');
                toast({ description: 'File renamed', status: 'success', duration: 3000, isClosable: false });
            } else {
                toast({ description: 'Error occurred while retrieving file content', status: 'error', duration: 3000, isClosable: false });
            }
        } catch (error) {
            console.error('Rename Error:', error);
            toast({ description: 'An error occurred while renaming the file', status: 'error', duration: 3000, isClosable: false });
        }
    }, [renameFile, renameFileName, toast]);

    useEffect(() => {
        // Load saved files from local storage
        const savedFiles = Object.keys(localStorage).filter(key => key.startsWith('file-'));
        setFiles(savedFiles);
    }, []);

    useEffect(() => {
        // Function to handle Ctrl+S event
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault();
                saveFile(); // Call the debounced saveFile function
            }
        };

        // Add keydown event listener
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [saveFile]);

    return (
        <>
            <Button onClick={onOpen} colorScheme='teal' size='sm' variant='solid'>
                <FaFileAlt />
            </Button>
            <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='md'>
                <DrawerOverlay />
                <DrawerContent bg='#2D3748'>
                    <DrawerCloseButton color='white' />
                    <DrawerHeader>
                        <Box display='flex' alignItems='center' justifyContent='space-between'>
                            <Text fontSize='xl' color='white'>
                                File Management
                            </Text>
                        </Box>
                    </DrawerHeader>
                    <DrawerBody bg='#1A202C' color='white'>
                        <Flex mb={4} align='center'>
                            <Input
                                placeholder='Enter file name'
                                value={newFileName}
                                onChange={(e) => setNewFileName(e.target.value)}
                                mr={4}
                                color='white'
                                bg='#2D3748'
                                borderColor='#4A5568'
                                focusBorderColor='blue.500'
                                flex='1'
                            />
                            <Tooltip hasArrow arrowSize={10} placement='top' label='Save the File' fontSize='xs'>
                                <Button onClick={saveFile} colorScheme='teal' size='sm' variant='solid' isLoading={isSaving}>
                                    Save
                                    {isSaving && <Spinner size='sm' ml={2} />}
                                </Button>
                            </Tooltip>
                        </Flex>
                        <List spacing={3} mt={4} >
                            {files.map((file, index) => (
                                <ListItem key={index} style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }} borderBottom='1px' borderColor='#4A5568' py={2}>
                                    <Box>
                                        <Text display='inline' pr='5px'>{`${index + 1}.`}</Text>
                                        <Tooltip hasArrow arrowSize={10} placement='top' label='Open the File' fontSize='xs'>
                                            <Button variant='link' color='teal.400' onClick={() => handleOpenFile(file)}>
                                                {file.replace('file-', '')}
                                            </Button>
                                        </Tooltip>
                                    </Box>
                                    <Box>
                                        <Tooltip hasArrow arrowSize={10} placement='top' label='Update the File' fontSize='xs'>
                                            <Button p={0} size='xs' ml='5px' colorScheme='blue' variant='solid' onClick={() => handleUpdateFile(file)}>
                                                <FaSync />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip hasArrow arrowSize={10} placement='top' label='Rename the File' fontSize='xs'>
                                            <Button p={0} size='xs' ml='5px' colorScheme='yellow' variant='solid' onClick={() => {
                                                setRenameFile(file);
                                                setRenameFileName(file.replace('file-', ''));
                                            }}>
                                                <FaEdit />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip hasArrow arrowSize={10} placement='top' label='Delete the File' fontSize='xs'>
                                            <Button p={0} size='xs' colorScheme='red' variant='solid' ml='5px' onClick={() => handleDeleteFile(file)}>
                                                <FaTrash />
                                            </Button>
                                        </Tooltip>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {/* Rename Modal */}
            <Modal isOpen={!!renameFile} onClose={() => setRenameFile(null)}>
                <ModalOverlay />
                <ModalContent bg='#1A202C' color='white'>
                    <ModalHeader>Rename File</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder='Enter new file name'
                            value={renameFileName}
                            onChange={(e) => setRenameFileName(e.target.value)}
                            mr={4}
                            color='white'
                            bg='#2D3748'
                            borderColor='#4A5568'
                            focusBorderColor='blue.500'
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button size='sm' colorScheme='blue' onClick={handleRenameFile}>
                            Rename
                        </Button>
                        <Button size='sm' colorScheme='red' ml={3} onClick={() => setRenameFile(null)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

// Define prop types
FilePanel.propTypes = {
    editorContent: PropTypes.string.isRequired,
    onFileChange: PropTypes.func.isRequired,
};

export default FilePanel;

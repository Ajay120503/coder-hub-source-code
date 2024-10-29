// src/SocketContext.jsx

import { createContext, useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { initSocket } from './SocketIO'; // Adjust this import based on your socket initialization logic

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);

    useEffect(() => {
        const initializeSocket = async () => {
            socketRef.current = await initSocket(); // Replace with your socket initialization logic
        };

        initializeSocket();

        return () => {
            socketRef.current?.disconnect(); // Cleanup on unmount
        };
    }, []);

    return (
        <SocketContext.Provider value={socketRef.current}>
            {children}
        </SocketContext.Provider>
    );
};

// Define PropTypes for the SocketProvider
SocketProvider.propTypes = {
    children: PropTypes.node.isRequired, // Specify that children must be a React node
};

export const useSocket = () => {
    return useContext(SocketContext);
};

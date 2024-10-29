import { io } from "socket.io-client";

// Function to initialize the Socket.io connection
export const initSocket = async () => {
    // Retrieve server URL from environment variables
    const serverUrl = "https://coder-hub-server.onrender.com/";

    if (!serverUrl) {
        throw new Error('SERVER_URL environment variable is not set.');
    }

    // Socket.io connection options
    const options = {
        reconnection: true, // Automatically attempt to reconnect
        reconnectionAttempts: Infinity, // Retry indefinitely
        reconnectionDelay: 1000, // Initial delay before reconnection
        reconnectionDelayMax: 5000, // Maximum delay before reconnection
        randomizationFactor: 0.5, // Randomization factor for the reconnection delay
        timeout: 10000, // Connection timeout
        transports: ['websocket'], // Use WebSocket transport
        autoConnect: true, // Automatically connect on initialization
        query: { // Query parameters for the connection
            token: '', // Add authentication token if needed
        },
        // Add custom headers if needed
        extraHeaders: {
            'x-custom-header': 'value',
        },
    };

    try {
        // Initialize and return the Socket.io connection
        const socket = io(serverUrl, options);

        // Handle socket events
        // socket.on('connect', () => {
        //     console.log('Socket connected to:', serverUrl);
        // });

        // socket.on('disconnect', () => {
        //     console.log('Socket disconnected from:', serverUrl);
        // });

        // socket.on('error', (error) => {
        //     console.error('Socket encountered an error:', error);
        // });

        // socket.on('connect_error', (error) => {
        //     console.error('Socket connection error:', error);
        // });

        // socket.on('connect_timeout', () => {
        //     console.error('Socket connection timed out');
        // });

        // socket.on('reconnect', (attempt) => {
        //     console.log('Socket reconnected after attempt:', attempt);
        // });

        // socket.on('reconnect_error', (error) => {
        //     console.error('Socket reconnection error:', error);
        // });

        // socket.on('reconnect_attempt', (attempt) => {
        //     console.log('Socket reconnection attempt:', attempt);
        // });

        return socket;
    } catch (error) {
        console.error('Failed to connect to the server:', error);
        throw error;
    }
};

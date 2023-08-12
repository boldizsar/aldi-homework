export const environment = {
    production: true,
    apiUrl: 'http://localhost:8080',
    endpoints: {
        websocket: 'websocket',
        message: '/app/message',
        publicChat: '/chatroom/public',
        privateChat: '/private/{:id}',
    },
};

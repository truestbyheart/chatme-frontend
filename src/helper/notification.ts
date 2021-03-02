import { io } from 'socket.io-client';

const token = localStorage.getItem('token');
const socket = io('__add_link', { query: { token: token as string }});

export default socket;
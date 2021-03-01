import { io } from 'socket.io-client';

const token = localStorage.getItem('token');
const socket = io('http://localhost:3001', { query: { token: token as string }});

export default socket;
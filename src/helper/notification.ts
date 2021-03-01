import { io } from 'socket.io-client';

const token = localStorage.getItem('token');
const socket = io('https://chatme-back.herokuapp.com', { query: { token: token as string }});

export default socket;
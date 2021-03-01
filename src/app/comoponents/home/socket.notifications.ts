// import socket from "../../../helper/notification";
import { IMessageStructure } from "../../../helper/rest.api";
import { io, Socket } from 'socket.io-client';

let socket: Socket;
export const initializeSocket = (room: string) => {
    socket = io('http://localhost:3001', { query: { chatID: room as string } })
    socket.emit('join', room);
}

export const listenToMessages = (cb: ($1: string | null | Error, $2: IMessageStructure) => void) => {
    return socket.on('chat', (msg: string) => {
        const chatObj = JSON.parse(msg);
        console.log(chatObj);
        return cb(null, chatObj);
    })
}

export const disconnectSocket = () => {
    if (socket) socket.disconnect();
}
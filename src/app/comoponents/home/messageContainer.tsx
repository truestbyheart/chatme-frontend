import React, { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from 'date-fns';
import { RootState } from "../../store";
import {
  gettingMessages,
  retrivedMessages,
  receivedMessage,
  failedToGetMessages,
} from "./messageSlice";
import { retrieveMessages, sendAPIMessage } from "../../../helper/rest.api";
import socket from "../../../helper/notification";

const Message: FC<RouteComponentProps> = ({ match: { params } }) => {
  console.log(params);
  // @ts-ignore
  const username: any = params["username"];

  // state
  const [msg, setMsg] = useState("")

  // redux
  const dispatch = useDispatch();
  const { messages } = useSelector((state: RootState) => state.message);

  // io listener
  socket.on('connection', (data: any) => {
    console.log(data);
  })

  // prefetch
  useEffect(() => {
    dispatch(gettingMessages());
    const fetchMessages = async () => {
      try {
        const res = await retrieveMessages(username);
        // @ts-ignore
        console.log(res?.result);
        if (res) {
          // @ts-ignore
          return dispatch(retrivedMessages(res?.result));
        }
      } catch (error) {
        let e = error.response.data
          ? error.response.data.message
          : error.message;
        dispatch(failedToGetMessages(e));
      }
    };

    fetchMessages();
  }, [dispatch, username]);

  // sendMessage
  const sendMessage = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const res = await sendAPIMessage({ message: msg, to: username})
      if(res) {
        // @ts-ignore
        return dispatch(retrivedMessages(res?.result));
      }
    } catch (error) {
      let e = error.response.data ? error.response.data.message : error.message;
      dispatch(failedToGetMessages(e));
    }
  }

  return (
    <>
      <div className="chat-container">
        <header className="chat-header">
          <h1>
            <i className="fas fa-smile"></i> ChatCord
          </h1>
          <a href="index.html" className="btn">
            Leave Room
          </a>
        </header>
        <main className="chat-main">
          <div className="chat-sidebar">
            <h3>
              <i className="fas fa-comments"></i> Room Name:
            </h3>
            <h2 id="room-name">JavaScript</h2>
            <h3>
              <i className="fas fa-users"></i> Users
            </h3>
            <ul id="users">
              <li>Brad</li>
              <li>John</li>
              <li>Mary</li>
              <li>Paul</li>
              <li>Mike</li>
            </ul>
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => {
              return (
                <div className="message" key={index}>
                  <p className="meta">
                    {message.sender}
                    <span style={{ marginLeft: '12px'}}>{format(new Date(message.updatedat), 'H:mm')}</span>
                  </p>
                  <p className="text">{message.message}</p>
                </div>
              );
            })}
          </div>
        </main>
        <div className="chat-form-container">
          <form id="chat-form" onSubmit={(e) => sendMessage(e)}>
            <input id="msg" type="text" placeholder="Enter Message"  value={msg}  onChange={(e) => setMsg(e.target.value)} required />
            <button className="btn" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Message;

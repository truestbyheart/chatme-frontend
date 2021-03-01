import React, { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { RootState } from "../../store";
import {
  gettingMessages,
  retrivedMessages,
  receivedMessage,
  failedToGetMessages,
} from "./messageSlice";
import {
  IMessageStructure,
  retrieveMessages,
  sendAPIMessage,
  getUserlist,
} from "../../../helper/rest.api";
import {
  gettingUsers,
  retrivedUsers,
  failedToGetUsers,
} from "./userSlice";
import {
  disconnectSocket,
  initializeSocket,
  listenToMessages,
} from "./socket.notifications";
import Spinner from "../animations/spinner";

const Message: FC<RouteComponentProps> = ({ match: { params }, history }) => {
  // @ts-ignore
  const username: any = params["username"];
  const currentRoom = localStorage.getItem("currentUser");
  let currentSelectedUser = currentRoom ? currentRoom : 0;

  // check auth
  const token = localStorage.getItem('token');
   if(!token) {
    history.push('/')
   }

  // state
  const [msg, setMsg] = useState("");

  // redux
  const dispatch = useDispatch();
  const { messages, isLoading } = useSelector(
    (state: RootState) => state.message
  );
  const { users } = useSelector((state: RootState) => state.users);

  // prefetch
  useEffect(() => {
    dispatch(gettingMessages());
    dispatch(gettingUsers());

    // fetching messages from the db
    const fetchMessages = async () => {
      try {
        const res = await retrieveMessages(username);
        const userList = await getUserlist();

        if (res) {
          dispatch(retrivedMessages(res.result));
        }

        if (userList) {
          return dispatch(retrivedUsers(userList.users));
        }
      } catch (error) {
        let e = error.response ? error.response.message : error.message;
        dispatch(failedToGetMessages(e));
        dispatch(failedToGetUsers(e));
      }
    };
    fetchMessages();

    // setting up the socket connection
    if (currentRoom) {
      initializeSocket(currentRoom);

      // subscribe to the chat events
      listenToMessages((err: Error | null | string, msg: IMessageStructure) => {
        if (err) return;
        dispatch(receivedMessage(msg));
      });
    }

    return () => {
      disconnectSocket();
    };
  }, [dispatch, username, currentRoom]);

  const changeURL = (e: any) => {
    e.preventDefault();
    const room = e.target.getAttribute("value");
    currentSelectedUser = room;
    history.push(`/home/${room}`);
  };

  // sendMessage
  const sendMessage = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const res = await sendAPIMessage({ message: msg, to: username });
      if (res) {
        setMsg("");
        return dispatch(retrivedMessages(res.result));
      }
    } catch (error) {
      let e = error.response.data ? error.response.data.message : error.message;
      dispatch(failedToGetMessages(e));
    }
  };

  // LogOut
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    history.push('/');
  }

  return (
    <>
      <div className="chat-container">
        <header className="chat-header">
          <h1> ChatMe</h1>
          <button className="btn" onClick={() => logout()}>
            LogOut
          </button>
        </header>
        <main className="chat-main">
          <div className="chat-sidebar">
            Users
            <ul id="users">
              {
                // eslint-disable-next-line
                users.map((user, index) => {
                  if (user.username !== currentRoom) {
                    return (
                      <li
                        key={index}
                        onClick={(e) => changeURL(e)}
                        value={user.username}
                        className={`list ${
                          currentSelectedUser === user.username
                            ? "list-active"
                            : ""
                        }`}
                      >
                        {user.username}
                      </li>
                    );
                  }
                })
              }
            </ul>
          </div>
          <div className="chat-messages">
            {!isLoading ? (
              messages.map((message, index) => {
                return (
                  <div className="message" key={index}>
                    <p className="meta">
                      {message.sender}
                      <span style={{ marginLeft: "12px" }}>
                        {format(new Date(message.updatedat), "H:mm")}
                      </span>
                    </p>
                    <p className="text">{message.message}</p>
                  </div>
                );
              })
            ) : (
              <Spinner></Spinner>
            )}
          </div>
        </main>
        <div className="chat-form-container">
          <form id="chat-form" onSubmit={(e) => sendMessage(e)}>
            <input
              id="msg"
              type="text"
              placeholder="Enter Message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              required
            />
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

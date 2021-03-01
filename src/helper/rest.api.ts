import axios from 'axios';

const fetch = axios.create({
  baseURL: 'http://localhost:3001'
})

export interface ILoginCreds {
  username: string;
  password: string;
}
export interface ICommonResponse {
  status: number;
  message: string;
}

export interface IMessageStructure {
  id: string;
  message: string;
  receiver: string;
  sender: string;
  createdat: string;
  updatedat: string;
  deletedat: string;
}

export interface IMessagesResponse {
  status: number;
  result: IMessageStructure[]
}

export const userLogin = async (creds: ILoginCreds): Promise<ICommonResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await fetch.post('/auth/login', creds);
      console.log(data);
      localStorage.setItem('token', data.token);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  })
}

export const retrieveMessages = (username: string): Promise<IMessagesResponse | ICommonResponse>=> {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await fetch.get(`/messages/${username}`, { headers: { authorization: token } })
      resolve(data);
    } catch (error) {
      reject(error)
    }
  })
}

export const sendAPIMessage = (messagePayload: { to: string; message: string }): Promise<IMessagesResponse | ICommonResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await fetch.post('/messages/send-message', messagePayload, { headers: { authorization: token } });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  })
}
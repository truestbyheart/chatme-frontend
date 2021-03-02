import axios from 'axios';

const fetch = axios.create({
  baseURL: '__add__link'
})

export interface IMessageStructure {
  id: string;
  message: string;
  receiver: string;
  sender: string;
  createdat: string;
  updatedat: string;
  deletedat: string;
}

export interface IUserDetails {
  id: string;
  username: string;
}

export interface ILoginCreds {
  username: string;
  password: string;
}
export interface ICommonResponse {
  status: number;
  username?: string;
  message?: string;
  users?: IUserDetails[];
  result?: IMessageStructure[]
}



export const userLogin = async (creds: ILoginCreds): Promise<ICommonResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await fetch.post('/auth/login', creds, { headers: { 'Content-Type': 'application/json' } });
      localStorage.setItem('token', data.token);
      localStorage.setItem('currentUser', data.username);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  })
}

export const retrieveMessages = (username: string): Promise<ICommonResponse> => {
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

export const sendAPIMessage = (messagePayload: { to: string; message: string }): Promise<ICommonResponse> => {
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

export const getUserlist = (): Promise<ICommonResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await fetch.get('/users', { headers: { authorization: token } });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  })
}

export const userSignUp = (creds: { username: string; password: string; email: string }): Promise<ICommonResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await fetch.post('/auth/signup', creds);
      localStorage.setItem('token', data.token);
      localStorage.setItem('currentUser', data.username);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  })
}
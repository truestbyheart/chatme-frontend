import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Alert from '../../Common/Alert';
import { Helmet } from 'react-helmet';
import { usePostLoginMutation } from '../../Helpers/rest.api';
import Spinner from '../../Common/Spinner';

export type LoginInputs = {
  username: string;
  email: string;
  password: string;
  confPassword: string;
};

const loginSchema = yup
  .object({
    username: yup.string().min(2).required(),
    password: yup.string().min(6).required('Password is required'),
  })
  .required();

export const Login: React.FC = (): React.ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(loginSchema),
  });

  const [loginPost] = usePostLoginMutation();
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    setIsLoading(true);
    loginPost(data)
      .unwrap()
      .then((payload: any) => {
        setIsLoading(false);
        localStorage.setItem('token', payload.token);
        localStorage.setItem('username', payload.username);
        navigate('/chat');
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage(error.data.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Chatme | Login</title>
      </Helmet>
      <main>
        <div className="flex justify-center  h-screen">
          <div className="self-center  rounded-md border-solid back w-96 h-90 p-4">
            <h1 className="flex justify-center font-medium text-senderColor">Chatme | Login </h1>
            {errorMessage && <Alert hasError message={errorMessage} />}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleSubmit(onSubmit)(e);
              }}
            >
              <div className="mt-4">
                <input
                  type="text"
                  className={`w-full py-2 px-2 rounded-md border-solid focus:outline-none focus:shadow-outline appearance-none ${errors.username && 'border-2 border-red-400'}`}
                  placeholder="Username"
                  disabled={isLoading}
                  {...register('username')}
                />
                {errors.username && <span className="text-red-500">*{errors.username?.message}</span>}
              </div>
              <div className="mt-4">
                <input
                  type="password"
                  className={`w-full py-2 px-2 rounded-md border-solid focus:outline-none focus:shadow-outline appearance-none ${errors.password && 'border-2 border-red-400'}`}
                  placeholder="Password"
                  disabled={isLoading}
                  {...register('password')}
                />
                {errors.password && <span className="text-red-500">*{errors.password?.message}</span>}
              </div>
              <div className="mt-4">
                <button className="flex justify-center w-full py-2 bg-senderColor rounded-md text-light" type="submit" disabled={isLoading}>
                  {isLoading && (
                    <span className="mr-2">
                      <Spinner />
                    </span>
                  )}
                  Login
                </button>
              </div>
              <div className="mt-4">
                <p className="text-dark">
                  Don&#39;t Have an account?{' '}
                  <Link className="text-senderColor" to="/signup">
                    Create One
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

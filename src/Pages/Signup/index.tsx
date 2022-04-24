import React, { FC, ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Helmet from 'react-helmet';
import * as yup from 'yup';
import { usePostSignupMutation } from '../../Helpers/rest.api';
import Alert from '../../Common/Alert';
import Spinner from '../../Common/Spinner';

export type SignupInputs = {
  username: string;
  email: string;
  password: string;
  confPassword: string;
};

const signupSchema = yup
  .object({
    username: yup.string().min(2, 'Username should have a minimum of  character').required(),
    email: yup.string().email('Provide a valid email').required('Email is required'),
    password: yup.string().min(6, 'Password should have a minimum of 6 character').required('Password is required'),
    confPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], "Passwords don't match")
      .required('Confirm Password is required'),
  })
  .required();

// eslint-disable-next-line react/function-component-definition
export const Signup: FC = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>({
    resolver: yupResolver(signupSchema),
  });
  const [postSignup] = usePostSignupMutation();
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    setIsLoading(true);
    postSignup(data)
      .unwrap()
      .then((payload: any) => {
        setIsLoading(false);
        localStorage.setItem('token', payload.token);
        localStorage.setItem('username', payload.username);
        navigate('/chat');
      })
      .catch((error: any) => {
        setIsLoading(false);
        setErrorMessage(error.data.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Chatme | Signup</title>
      </Helmet>
      <main>
        <div className="flex justify-center h-screen">
          <div className="self-center  rounded-md border-solid back w-96 h-90 p-4">
            <h1 className="flex justify-center font-medium text-senderColor">Chatme | SignUp</h1>
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
                  autoComplete="false"
                  {...register('username')}
                  disabled={isLoading}
                />
                {errors.username && <span className="text-red-500">*{errors.username?.message}</span>}
              </div>
              <div className="mt-4">
                <input
                  type="email"
                  className={`w-full py-2 px-2 rounded-md border-solid focus:outline-none focus:shadow-outline appearance-none ${errors.email && 'border-2 border-red-400'}`}
                  placeholder="Email"
                  autoComplete="false"
                  {...register('email')}
                  disabled={isLoading}
                />
                {errors.email && <span className="text-red-500">*{errors.email?.message}</span>}
              </div>
              <div className="mt-4">
                <input
                  type="password"
                  className={`w-full py-2 px-2 rounded-md border-solid focus:outline-none focus:shadow-outline appearance-none ${errors.password && ' border-2border-red-400'}`}
                  placeholder="Password"
                  autoComplete="false"
                  {...register('password')}
                  disabled={isLoading}
                />
                {errors.password && <span className="text-red-500">*{errors.password?.message}</span>}
              </div>
              <div className="mt-4">
                <input
                  type="password"
                  className={`w-full py-2 px-2 rounded-md border-solid focus:outline-none focus:shadow-outline appearance-none ${errors.confPassword && 'border-2 border-red-400'}`}
                  placeholder="Confirm Password"
                  autoComplete="false"
                  {...register('confPassword')}
                  disabled={isLoading}
                />
                {errors.confPassword && <span className="text-red-500">*{errors.confPassword?.message}</span>}
              </div>
              <div className="mt-4">
                <button className="flex w-full py-2 px-4 justify-center bg-senderColor rounded-md text-light focus:outline-none focus:shadow-outline appearance-none" type="submit" disabled={isLoading}>
                  {isLoading && (
                    <span className="mr-2">
                      <Spinner />
                    </span>
                  )}
                  Create
                </button>
              </div>
              <div className="mt-4">
                <p className="text-dark">
                  Have an account?
                  <Link className="text-senderColor" to="/">
                    Login
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

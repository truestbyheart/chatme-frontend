import React from 'react';
import { BiCheck, BiError } from 'react-icons/bi';

export interface AlertProps {
  hasError: boolean;
  message: string;
}

const Alert: React.FC<AlertProps> = ({ hasError, message }: AlertProps): React.ReactElement => {
  return (
    <div className={`flex border-t-4  px-4 py-3 mt-4 relative ${hasError ? 'bg-red-100 border-red-700 text-red-700' : 'bg-teal-100 border-teal-400 text-black'}`} role="alert">
      <span className="py-1">{hasError ? <BiError size="2em" /> : <BiCheck size="2em" />}</span>
      <div className="ml-4">
        <p className="font-bold">{hasError ? 'Error' : 'Success'}</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Alert;

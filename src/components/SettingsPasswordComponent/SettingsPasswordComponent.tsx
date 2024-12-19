import { useState } from 'react';
import './SettingsPasswordComponent.scss';
import eyeImg from '../../../public/images/eye.svg';
import eyeSlashImg from '../../../public/images/eye-slash.svg';
import React from 'react';

interface Props {}

export const SettingsPasswordComponent: React.FC<Props> = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRePasswordVisible, setIsRePasswordVisible] = useState(false);
  return (
    <div className="password">
      <div className="password__title">Password</div>
      <form className="password__form">
        <label 
          className="password__label"
        >
          New password
          <input 
            type={isPasswordVisible ? 'text' : 'password'} 
            className="password__input" 
            placeholder="Create new password"
          />

          <img 
            src={isPasswordVisible ? eyeSlashImg : eyeImg} 
            alt="show password" 
            className='password__input-eye'
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        </label>

        <label 
          className="password__label"
        >
          Re-enter new password
          <input 
            type={isRePasswordVisible ? 'text' : 'password'} 
            className="password__input" 
            placeholder="Enter your new password"
          />

          <img 
            src={isRePasswordVisible ? eyeSlashImg : eyeImg} 
            alt="show re-password" 
            className='password__input-eye'
            onClick={() => setIsRePasswordVisible(!isRePasswordVisible)}
          />
        </label>

        <button
          type="submit"
          className='password__button'
        >
          Save
        </button>
      </form>
    </div>
  );
};

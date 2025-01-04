import validator from 'validator';
import { mainPasswordRegex } from './regex';

export const validateUserName = (username: string) => {
  //username should be at least 4 characters
  return username.length >= 4;
}

export const validateEmail = (email: string) => {
  // checking email format for a valid format
  // instead of using a default email validation using html input email
  // we made a manual check for a general stylization
  // otherwise styles between email input and username and password will differ to much
  return validator.isEmail(email);
}

export const validatePassword = (password: string) => {
  //password should me the requirements
  return mainPasswordRegex.test(password);
}

// main regex which will check if password is: 
//1) at least 8 char long;
//2) has lowercase and uppercase letter
//3) has a digit
//4) has a special character
export const mainPasswordRegex =  new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|\[\]\{\}\;\:\/\?\.\>\<])[A-Za-z\d!@#$%^&*()\-_=+\\|\[\]\{\}\;\:\/\?\.\>\<]{8,}$/); 
export const passwordLongEnough = new RegExp(/^[A-Za-z\d!@#$%^&*()\-_=+\\|\[\]\{\}\;\:\/\?\.\>\<]{8,}$/);
export const passwordHasLowerCaseLetter = new RegExp(/^(?=.*[a-z])/);
export const passwordHasUpperCaseLetter = new RegExp(/^(?=.*[A-Z])/);
export const passwordHasDigit = new RegExp(/^(?=.*\d)/);
export const passwordHasSpecialChar = new RegExp(/^(?=.*[!@#$%^&*()\-_=+\\|\[\]\{\}\;\:\/\?\.\>\<])/);
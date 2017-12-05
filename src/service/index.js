import fetch from '@/config/fetch';

export const loginReq = (username, pwd) => fetch(`User/?User.username=${username}&User.pwd=${pwd}`,
  {}, 'GET',
);
export const userReg = (username, pwd) => fetch(`User/?User.username=${username}&User.pwd=${pwd}`,
  {}, 'POST',
);

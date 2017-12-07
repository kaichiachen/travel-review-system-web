import fetch from '@/config/fetch';

export const loginReq = (username, pwd) => fetch(`User/?User.username=${username}&User.pwd=${pwd}`,
  {}, 'GET',
);
export const userRegister = userInfo => fetch('User/',
  {
    name: userInfo.name,
    username: userInfo.username,
    pwd: userInfo.pwd,
    role: userInfo.role,
  }, 'POST',
);

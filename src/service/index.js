import fetch from '@/config/fetch';

export const loginReq = (paraEmail, paraPwd) => fetch(`user/login`, {
  email: paraEmail,
  pwd: paraPwd,
}, 'POST',
);

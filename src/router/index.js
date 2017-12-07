import Vue from 'vue';
import Router from 'vue-router';
import App from '@/App';
import Hello from '@/components/Hello';
import Login from '@/page/Login';
import Register from '@/page/Register';
import Post from '@/page/Post';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    component: App,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: '/home',
        component: Hello,
        children: [
          {
            path: '/login',
            component: Login,
          },
          {
            path: '/register',
            component: Register,
          },
        ],
      },
      {
        path: '/posts',
        component: Post,
      },
    ],
  }],
});

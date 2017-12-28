import Vue from 'vue';
import Router from 'vue-router';
import App from '@/App';
import Hello from '@/components/Hello';
import Login from '@/page/Login';
import Register from '@/page/Register';
import Post from '@/page/Post';
import Review from '@/page/Review';
import User from '@/page/User';
import NewPost from '@/page/NewPost';
import MyPost from '@/page/MyPost';
import StoreInRDF from '@/page/StoreInRDF';

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
        path: '/users',
        component: User,
      },
      {
        path: '/posts',
        component: Post,
      },
      {
        path: '/myreview',
        component: Review,
      },
      {
        path: '/draft',
        component: NewPost,
      },
      {
        path: '/myposts',
        component: MyPost,
      },
      {
        path: '/rdf',
        component: StoreInRDF,
      },
    ],
  }],
});

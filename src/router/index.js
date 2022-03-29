import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import OverView from '../views/OverView/OverView'
import About from '../views/About/About'
import ListUser from '../views/Admin/ListUser'
import Login from '../views/Login/Login'
import Register from '../views/Register/Register'
import Advertising from '../views/Advertising/Advertising'
import Partner from '../views/Partner/Partner'
import EditTablePartner from '../views/Partner/table/EditTable'
import Statistic from '../views/Statistic/Statistic'
import StatisticOrder from '../views/Statistic/order/order'
import Notification from '../views/Notifications/Notification'
import ErrorPage from '../components/404'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,

    children: [
      { path: '', component: OverView },
      {

        path: 'overview',
        component: OverView
      },
      {
        path: 'about',
        component: About
      },
      {
        path: 'listuser',
        component: ListUser
      },
      {
        path: 'advertising',
        component: Advertising
      },
      {
        path: 'partner',
        component: Partner,
        children: [
          {
            path: 'editpartner',
            component: EditTablePartner
          }
        ]
      },
      {
        path: 'statistic',
        component: Statistic,
        children: [
          {
            path: 'order',
            component: StatisticOrder,
            name : 'order'
          },

        ]
      },
      {
        path: 'notification',
        component: Notification,
        name : 'notification'
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register/:id',
    name: 'register',
    component: Register,
  },
  {
    path: '/404',
    name: 'errorpage',
    component: ErrorPage
  },
  {
    path: '*',
    redirect: '/404',
    component: ErrorPage
  },
];
const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('loginStatus') == null && to.name !== 'login') {
    if (to.name !== 'register') {
      next({ name: 'login' });
    }
    else {
      next();
    }

  }
  else {
    next();
  }
})

export default router

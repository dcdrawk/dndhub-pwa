import Vue from 'vue'
import Router from 'vue-router'

// Auth
import SignIn from '@/components/pages/auth/SignIn'
import SignUp from '@/components/pages/auth/SignUp'
import Profile from '@/components/pages/auth/Profile'

// Characters
import Characters from '@/components/pages/characters/Characters'
import NewCharacter from '@/components/pages/characters/NewCharacter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SignIn',
      component: SignIn
    }, {
      path: '/sign-in',
      name: 'Sign In',
      component: SignIn
    }, {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }, {
      path: '/sign-up',
      name: 'Sign Up',
      component: SignUp
    }, {
      path: '/characters',
      name: 'Characters',
      component: Characters
    }, {
      path: '/characters/new',
      name: 'New Character',
      component: NewCharacter
    }
  ]
})

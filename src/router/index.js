import Vue from 'vue'
import Router from 'vue-router'

// Auth
import SignIn from '@/components/pages/auth/SignIn'
import SignUp from '@/components/pages/auth/SignUp'
import Profile from '@/components/pages/auth/Profile'

// Characters
import CharacterList from '@/components/pages/characters/CharacterList'
import NewCharacter from '@/components/pages/characters/NewCharacter'

// Details
import General from '@/components/pages/details/General'

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
      component: CharacterList
    }, {
      path: '/characters/new',
      name: 'New Character',
      component: NewCharacter
    }, {
      path: '/details/general',
      name: 'General',
      component: General
    }
  ]
})

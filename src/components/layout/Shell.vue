<template>
  <v-app toolbar>
    <navigation-drawer
      :open="navOpen"
      @toggle="navOpen = $event"
    ></navigation-drawer>
    <toolbar
      @toggle="navOpen = !navOpen"
    ></toolbar>
    <main>
      <v-container class="dnd-container">
        <router-view></router-view>
      </v-container>
    </main>

    <!-- Toaster -->
    <dnd-toaster></dnd-toaster>

    <!-- Firebase -->
    <firebase></firebase>
  </v-app>
</template>

<script>
/**
 * <shell></shell>
 * @desc Contains all the pieces of the app
 */
import Firebase from '../../firebase/Firebase'
import DndToaster from '../toast/DndToaster'
import Toolbar from './Toolbar'
import NavigationDrawer from './NavigationDrawer'

export default {
  // Name
  name: 'shell',

  // Components
  components: {
    Firebase,
    Toolbar,
    NavigationDrawer,
    DndToaster
  },

  // Props
  props: {},

  // Data
  data () {
    return {
      navOpen: true
    }
  }
}
</script>

<style scoped lang="scss">
@media screen and (max-width: 480px) {
  .dnd-container {
    padding: 0;
  }
}
</style>

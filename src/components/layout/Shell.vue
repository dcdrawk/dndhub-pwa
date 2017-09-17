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

    <!-- Characters -->
    <characters></characters>

    <!-- Game Data -->
    <game-data v-if="user"></game-data>
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
import GameData from '../game-data/GameData'
import Characters from '../pages/characters/Characters'

export default {
  // Name
  name: 'shell',

  // Components
  components: {
    Firebase,
    Toolbar,
    NavigationDrawer,
    DndToaster,
    GameData,
    Characters
  },

  // Props
  props: {},

  // Data
  data () {
    return {
      navOpen: true
    }
  },

  // Computed
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style scoped lang="scss">
.dnd-container {
  max-width: 1200px;
  padding: 0;
  // @media screen and (max-width: 480px) {}
  @media screen and (min-width: 480px) {
    margin-top: 16px;
  }
}
</style>

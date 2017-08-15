<template>
  <v-app toolbar>
    <navigation-drawer
      :open="navOpen"
      @toggle="navOpen = !navOpen"
    ></navigation-drawer>
    <toolbar
      @toggle="navOpen = !navOpen"
    ></toolbar>
    <main>
      {{ navOpen }}
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
/**
 * <shell></shell>
 * @desc Contains all the pieces of the app
 */
import Toolbar from './Toolbar'
import NavigationDrawer from './NavigationDrawer'

export default {
  // Name
  name: 'component',

  // Components
  components: {
    Toolbar,
    NavigationDrawer
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
  computed: {},

  // Watch
  watch: {},

  // Methods
  methods: {
    toggle () {
      console.log('toggle')
    }
  },

  // Created
  created () {},

  // Mounted
  mounted () {}
}
</script>

<style scoped lang="scss">
</style>

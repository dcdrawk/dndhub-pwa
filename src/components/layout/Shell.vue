<template>
  <v-app>
    <navigation-drawer></navigation-drawer>
    <toolbar></toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
        <v-list>
      <!-- <v-list-tile v-for="item in menu" :key="item.title">
        Test
      </v-list-tile> -->
      <v-list-tile class="test">
        Test
      </v-list-tile>
    </v-list>
      </v-container>
    </main>
    <v-footer></v-footer>
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
      msg: 'Hello World'
    }
  },

  // Computed
  computed: {},

  // Watch
  watch: {},

  // Methods
  methods: {},

  // Created
  created () {},

  // Mounted
  mounted () {}
}
</script>

<style scoped lang="scss">
</style>

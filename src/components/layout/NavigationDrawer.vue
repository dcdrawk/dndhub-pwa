<template>
  <v-navigation-drawer
    persistent
    :value="open"
    light
    enable-resize-watcher
    overflow
    @input="$emit('toggle', $event)"
  >
    <v-list dense class="pt-2">
      <v-list-group
        v-for="item in menu"
        v-model="item.active"
        :key="item.title"
      >
        <v-list-tile slot="item" :to="item.href">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="item.subitems">
            <v-icon>keyboard_arrow_down</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list>
    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script>
/**
 * <navigation-drawer></navigation-drawer>
 * Component
 * @desc description
 */
export default {
  // Name
  name: 'navigation-drawer',

  // Components
  components: {},

  // Props
  props: {
    open: Boolean
  },

  // Data
  data () {
    return {
      show: true,
      defaultMenu: [{
        title: 'Sign In',
        icon: 'person',
        href: '/sign-in',
        active: false
      }, {
        title: 'Sign Up',
        icon: 'assignment',
        href: '/sign-up',
        active: false
      }],
      userMenu: [{
        title: 'Profile',
        icon: 'account_circle',
        href: '/profile'
      }]
    }
  },

  // Computed
  computed: {
    menu () {
      return this.user
        ? this.userMenu
        : this.defaultMenu
    },
    user () {
      return this.$store.state.user
    }
  },

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

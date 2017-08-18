<template>
  <!-- Navigation Drawer -->
  <v-navigation-drawer
    persistent
    :value="open"
    light
    enable-resize-watcher
    overflow
    @input="$emit('toggle', $event)"
  >
    <!-- List -->
    <v-list dense class="pt-2">
      <!-- List Group -->
      <v-list-group
        v-for="item in menu"
        v-model="item.active"
        :key="item.title"
      >
        <!-- List Tile -->
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

    <!-- List -->
    <v-list dense class="pt-2">
      <h3 class="subheader ma-0">Character</h3>
      <!-- List Group -->
      <v-list-group
        v-for="item in characterMenu"
        v-model="item.active"
        :key="item.title"
      >
        <!-- List Tile -->
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
 * @desc Display the proper menu for the user
 */
export default {
  // Name
  name: 'navigation-drawer',

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
      }, {
        title: 'Characters',
        icon: 'view_list',
        href: '/characters'
      }],
      characterMenu: [{
        title: 'Character Details',
        icon: 'description',
        href: '/character/general'
      }, {
        title: 'Stats',
        icon: 'insert_chart',
        href: '/character/general'
      }, {
        title: 'Info',
        icon: 'info',
        href: '/character/general'
      }, {
        title: 'Info',
        icon: 'info',
        href: '/character/general'
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
  }
}
</script>

<style scoped lang="scss">
</style>

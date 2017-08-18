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
        <v-list-tile slot="item">
          <v-list-tile-action>
            <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
            <img
              v-else-if="item.svg"
              class="icon custom-icon"
              :src="`/static/img/icons/${item.svg}.svg`"
            />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="item.items">
            <v-icon>keyboard_arrow_down</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile v-if="item.items" v-for="(subItem, index) in item.items" :key="index">
          <v-list-tile-content>
            <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>{{ subItem.action }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list>
    <!-- <v-divider></v-divider> -->
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
        title: 'Details',
        icon: 'description',
        active: false,
        items: [{
          title: 'General'
        }, {
          title: 'Race'
        }, {
          title: 'Class'
        }]
      }, {
        title: 'Stats',
        svg: 'dice-d20',
        active: false,
        items: [{
          title: 'Ability Scores'
        }, {
          title: 'Saving Throws'
        }, {
          title: 'Combat'
        }]
      }, {
        title: 'Armor',
        svg: 'shield',
        active: false,
        items: [{
          title: 'Equipped'
        }, {
          title: 'Browse'
        }]
      }, {
        title: 'Weapons',
        svg: 'sword',
        active: false,
        items: [{
          title: 'Equipped'
        }, {
          title: 'Browse'
        }]
      }, {
        title: 'Spells',
        svg: 'fire',
        active: false,
        items: [{
          title: 'Equipped'
        }, {
          title: 'Browse'
        }]
      }, {
        title: 'Inventory',
        svg: 'package',
        active: false,
        items: [{
          title: 'Equipped'
        }, {
          title: 'Browse'
        }]
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
// .icon {
//     -webkit-box-align: center;
//     -ms-flex-align: center;
//     align-items: center;
//     display: -webkit-inline-box;
//     display: -ms-inline-flexbox;
//     display: inline-flex;
//     font-size: 24px;
//     -webkit-box-pack: center;
//     -ms-flex-pack: center;
//     justify-content: center;
//     transition: .3s cubic-bezier(.25,.8,.25,1);
//     vertical-align: middle;
// }
.custom-icon {
  opacity: 0.54;
  width: 21px;
}
</style>

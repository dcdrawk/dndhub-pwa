<template>
  <div>
  <!-- Card -->
  <v-card>

    <!-- Card Title -->
    <v-card-title>
      <h3 class="headline ma-0">Characters</h3>
    </v-card-title>

    <!-- Character List -->
    <v-list two-line dense>
      <v-list-tile
        class="character-list-tile"
        :class="{'teal lighten-5': index === characterId }"
        v-for="(item, index) in characters"
        :key="index"
        @click.stop.prevent="selectCharacter(index)"
      >
        <!-- List tile actions -->
        <v-list-tile-action>
          <v-radio
            class="ml-2"
            primary
            v-model="characterId"
            :value="index"
            :ripple="false"
          ></v-radio>
        </v-list-tile-action>

        <!-- List tile content -->
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title>
            Level {{ item.level }} {{ item.race }} {{ item.class }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
    <v-fab-transition>
      <v-btn
        class="teal"
        dark
        fab
        fixed
        bottom
        right
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
/**
 * <characters></characters>
 * @desc user's list of characters
 */
export default {
  // Name
  name: 'characters',

  // Data
  data () {
    return {
      edit: false,
      userCopy: undefined,
      loading: false
    }
  },

  // Computed
  computed: {
    user () { return this.$store.state.user },
    characters () { return this.$store.state.characters },
    characterId () { return this.$store.state.characterId }
  },

  // Watch
  watch: {
    user (newValue, oldValue) {
      this.getCharacters()
    }
  },

  // Methods
  methods: {
    /**
     * Get Characters
     * @desc get the user's list of characters
     */
    getCharacters () {
      if (this.user) {
        this.$db.ref(`characters/${this.user.uid}`).on('value', (snapshot) => {
          this.$store.commit('update_characters', snapshot.val())
        })
      }
    },

    /**
     * Select Character
     * @desc Stop editing
     */
    selectCharacter (id) {
      this.$store.commit('select_character', id)
    }
  },

  // Mounted
  mounted () {
    this.getCharacters()
  }

}
</script>

<style scoped lang="scss">
.character-list-tile {
  transition: background-color 250ms ease-out;
}
.selected {
  background-color: red;
}
</style>

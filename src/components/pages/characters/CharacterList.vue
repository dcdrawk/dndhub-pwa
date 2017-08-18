<template>
  <div>
    <!-- Card -->
    <v-card class="mb-5">

      <!-- Card Title -->
      <!-- <v-card-title>
        <h3 class="headline ma-0">Characters</h3>
      </v-card-title> -->

      <!-- Character List -->
      <v-list two-line dense>
        <v-list-tile
          class="character-list-tile"
          :class="{'teal lighten-5': index === characterId }"
          v-for="(item, index) in characters"
          :key="index"
        >
          <!-- List tile actions -->
          <v-list-tile-action>
            <v-radio
              class="ml-2"
              primary
              v-model="characterId"
              :value="index"
              :ripple="false"
              @click.prevent="selectCharacter(index)"
            ></v-radio>
          </v-list-tile-action>

          <!-- List tile content -->
          <v-list-tile-content
            @click.prevent="selectCharacter(index)"
          >
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            <v-list-tile-sub-title>
              Level {{ item.level }} {{ item.race }} {{ item.class }}
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <!-- List tile actions -->
          <v-list-tile-action>
            <!-- Logout menu -->
            <v-menu bottom left>
              <v-btn icon slot="activator" @click>
                <v-icon >more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile
                  @click="showDeleteDialog(item, index)"
                >
                  <v-list-tile-action>
                    <v-icon>delete</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>Delete</v-list-tile-title>
                </v-list-tile>
                <v-list-tile
                  @click="duplicateCharacter(item)"
                >
                  <v-list-tile-action>
                    <v-icon>content_copy</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>Duplicate</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>

    <!-- Delete Dialog -->
    <v-dialog v-model="deleteDialog">
      <v-card>
        <v-card-title class="headline">Delete Character?</v-card-title>
        <v-card-text>Are you sure you want to delete this character?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            flat
            :disabled="loading"
            @click="deleteDialog = false"
          >Cancel</v-btn>
          <v-btn
            class="red"
            dark
            :loading="loading"
            @click="deleteCharacter()"
          >Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-fab-transition>
      <v-btn
        class="teal"
        dark fab
        fixed bottom right small
        to="/characters/new"
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
      loading: false,
      deleteDialog: false,
      selectedCharacter: undefined,
      selectedCharacterId: undefined
    }
  },

  // Computed
  computed: {
    user () { return this.$store.state.user },
    characters () { return this.$store.state.characters },
    characterId () { return this.$store.state.characterId }
  },
  // Methods
  methods: {
    /**
     * Select Character
     * @desc Stop editing
     */
    selectCharacter (id) {
      this.$store.commit('select_character', id)
    },

    /**
     * Show Delete Dialog
     * @param {Object} - character
     * @param {String} - id
     */
    showDeleteDialog (character, id) {
      this.selectedCharacter = {...character}
      this.selectedCharacterId = id
      this.deleteDialog = true
    },

    /**
     * Delete Character
     */
    async deleteCharacter () {
      try {
        this.loading = true
        await this.$db
          .ref(`/characters/${this.user.uid}/${this.selectedCharacterId}`)
          .remove()
        this.deleteDialog = false
      } catch (error) {
        console.warn(error)
      } finally {
        this.loading = false
      }
    },

    /**
     * Duplicate Character
     * @param {Object} character
     */
    async duplicateCharacter (character) {
      try {
        this.loading = true
        await this.$db
          .ref(`/characters/${this.user.uid}/`).push(character)
      } catch (error) {
        console.warn(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.character-list-tile {
  transition: background-color 250ms ease-out;
}
</style>

<template>
  <div class="flexbox">
    <v-select
      bottom
      v-if="!custom"
      class="pb-0"
      :label="label"
      :items="items"
      :item-text="itemText"
      :item-value="itemValue"
      :value="value"
      :disabled="disabled"
      @input="$emit('input', $event)"
    ></v-select>
    <v-text-field
      v-else
      ref="input"
      class="pb-0"
      :name="name"
      :label="label"
      :value="value"
      @input="$emit('input', $event)"
    ></v-text-field>
    <v-btn
      icon class="mb-0 mt-3"
      :disabled="disabled"
      @click="$emit('customize')"
    >
      <v-icon v-if="!custom">
        edit
      </v-icon>
      <v-icon v-else>
        close
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
/**
 * <component></component>
 * Component
 * @desc description
 */
export default {
  // Name
  name: 'component',

  // Components
  components: {},

  // Props
  props: {
    items: Array,
    itemText: String,
    itemValue: String,
    value: String,
    custom: Boolean,
    label: String,
    name: String,
    disabled: Boolean
  },

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

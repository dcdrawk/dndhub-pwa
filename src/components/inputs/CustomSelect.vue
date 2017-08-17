<template>
  <div class="flexbox">
    <!-- Select -->
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

    <!-- Input Field -->
    <v-text-field
      v-else
      ref="input"
      class="pb-0"
      :name="name"
      :label="label"
      :value="value"
      @input="$emit('input', $event)"
    ></v-text-field>

    <!-- Edit / Cancel Button -->
    <v-btn
      icon class="mb-0 mt-3"
      :disabled="disabled"
      @click="customize()"
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
 * <custom-select></custom-select>
 * @desc Select with optional text input field
 */
export default {
  // Name
  name: 'custom-select',

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

  // Methods
  methods: {
    /**
     * Customize
     * @desc Emit a 'customize' event and focus the input field
     * @emits customize
     */
    customize () {
      this.$emit('customize')
      this.$nextTick(() => {
        if (!this.custom) return
        this.$refs.input.focus()
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>

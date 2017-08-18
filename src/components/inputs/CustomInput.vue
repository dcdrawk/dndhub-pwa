<template>
  <div class="flexbox">
    <!-- Select -->
    <v-text-field
      bottom
      v-if="!custom"
      class="pb-0"
      :label="label"
      :disabled="disabled || readOnly"
      :type="type"
      :value="value"
      @input="$emit('input', $event)"
    ></v-text-field>

    <!-- Input Field -->
    <v-text-field
      v-else
      ref="input"
      class="pb-0"
      :name="name"
      :label="label"
      :type="type"
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
 * <custom-input></custom-input>
 * @desc Select with optional text input field
 */
export default {
  // Name
  name: 'custom-input',

  // Props
  props: {
    items: Array,
    itemText: String,
    itemValue: String,
    value: [String, Number],
    custom: Boolean,
    label: String,
    name: String,
    disabled: Boolean,
    readOnly: Boolean,
    type: String
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

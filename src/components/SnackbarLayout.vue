<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  snackbar: Boolean,
  message: String,
});
const snackbar = computed(() => props.snackbar);
const message = computed(() => props.message);
</script>
<template>
  <div class="text-center">
    <v-snackbar v-model="snackbar" location="top">
      <p class="text-center">
        {{ message }}
      </p>
    </v-snackbar>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  users: Array,
});
const users = computed(() => props.users);
</script>
<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h3 class="text-white">users</h3>
      </v-col>
      <v-divider color="white" class="border-opacity-100"></v-divider>
      <v-col v-if="users">
        <div class="h-auto d-flex align-center pt-5 px-5" v-for="user in users" :key="user">
          <v-avatar>
            <v-img :src="user.image" :alt="user.name"> </v-img>
          </v-avatar>
          <span class="text-white ps-3 text-capitalize">{{ user.name }}</span>
          <span class="ms-auto" v-if="user.isLogin">
            <v-badge color="success" dot inline> </v-badge
          ></span>
          <span class="ms-auto" v-else> <v-badge color="error" dot inline> </v-badge></span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

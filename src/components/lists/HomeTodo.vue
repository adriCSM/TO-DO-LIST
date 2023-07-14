<script setup>
import { onValue, ref } from 'firebase/database';
import db from '../../firebase/config';

import { ref as refs, onMounted } from 'vue';
import TodoLayout from './TodoLayout.vue';
import UserLayout from './UserLayout.vue';

const users = refs([]);
onMounted(async () => {
  onValue(ref(db, 'users'), (snapshot) => {
    let data = [];
    snapshot.forEach((child) => {
      data.push(child.val());
    });
    users.value = data;
  });
});
</script>
<template>
  <div style="background-color: #1d212f; min-height: 100vh" class="pa-5">
    <v-row>
      <v-col cols="12" md="9">
        <TodoLayout />
      </v-col>
      <v-col cols="12" md="3" class="bg-white user">
        <UserLayout :users="users" />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.user {
  background-image: url('../../assets/marek-piwnicki-MlRbhx_1Vy0-unsplash.jpg');
  background-size: cover;
}
</style>

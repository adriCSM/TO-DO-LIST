<script setup>
import { useStore } from 'vuex';

const store = useStore();
const login = async () => {
  await store.dispatch('auth/login');
  await store.dispatch('user/getUsers');
  const users = store.state.user.users;
  const userExsist = users.find((user) => user.email == store.state.auth.user.email);
  if (!userExsist) {
    const {
      uid: id,
      stsTokenManager: token,
      displayName: name,
      email: email,
      photoURL: image,
    } = store.state.auth.user;
    await store.dispatch('user/addUser', { id, name, email, image, token, isLogin: true });
  } else {
    await store.dispatch('user/updateUser', { id: userExsist.id, payload: { isLogin: true } });
  }
};
</script>

<template>
  <div class="h-screen d-flex align-center justify-center login" style="">
    <v-card
      width="50vh"
      height="auto"
      class="text-center pa-5 mx-5"
      :style="{ boxShadow: '0 0 1rem rgb(197, 214, 45)' }"
    >
      <v-card-title class="text-center" style="color: #0fe">To Do List's </v-card-title>
      <v-card-title class="text-center text-white" style="text-shadow: 0 0 1rem rgb(197, 214, 45)"
        >Log In
      </v-card-title>
      <v-card-subtitle class="font-weight-bold pb-3 text-white">With</v-card-subtitle>
      <v-hover>
        <v-tooltip text="Google" location="start">
          <template v-slot:activator="{ isActive, props }">
            <v-btn
              v-bind="props"
              class="text-capitalize mx-2"
              @click.prevent="login"
              color="info"
              icon="mdi-google"
              :style="isActive ? { boxShadow: ' 0 0 1rem white' } : 'none'"
            ></v-btn>
          </template>
        </v-tooltip>
      </v-hover>
    </v-card>
  </div>
</template>
<style scoped>
.login {
  background-image: url(../../assets/marek-piwnicki-MlRbhx_1Vy0-unsplash.jpg);
  background-size: cover;
}

.v-card {
  background: #00000005;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(15px);
}
</style>

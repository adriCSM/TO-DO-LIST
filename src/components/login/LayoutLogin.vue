<script setup>
import router from '@/router';
import { useStore } from 'vuex';

const store = useStore();
const login = async () => {
  await store.dispatch('auth/login');
  if (store.state.auth.user) {
    await store.dispatch('user/getUser', store.state.auth.user.uid);
    const user = store.state.user.user;
    if (!user) {
      const {
        uid: id,
        stsTokenManager: token,
        displayName: name,
        email: email,
        photoURL: image,
      } = store.state.auth.user;
      await store.dispatch('user/addUser', { id, name, email, image, token });
      router.push({ name: 'Home' });
    } else {
      await store.dispatch('user/updateUser', { id: user.id, payload: { isLogin: true } });
      router.push({ name: 'Home' });
    }
  }
};

const loginGit = async () => {
  await store.dispatch('auth/loginGithub');
  if (store.state.auth.user) {
    await store.dispatch('user/getUser', store.state.auth.user.uid);
    const user = store.state.user.user;
    if (!user) {
      const {
        uid: id,
        stsTokenManager: token,
        reloadUserInfo,
        email: email,
        photoURL: image,
      } = store.state.auth.user;
      await store.dispatch('user/addUser', {
        id,
        name: reloadUserInfo.screenName,
        email,
        image,
        token,
      });
      router.push({ name: 'Home' });
    } else {
      await store.dispatch('user/updateUser', { id: user.id, payload: { isLogin: true } });
      router.push({ name: 'Home' });
    }
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
      <v-tooltip text="Github" location="end">
        <template v-slot:activator="{ props, isActive }">
          <v-btn
            v-bind="props"
            class="text-capitalize mx-2"
            @click.prevent="loginGit"
            color="white"
            icon="mdi-github"
            :style="isActive ? { boxShadow: ' 0 0 1rem white' } : 'none'"
          ></v-btn>
        </template>
      </v-tooltip>
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

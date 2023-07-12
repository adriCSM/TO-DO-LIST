<script setup>
import { useStore } from 'vuex';

const store = useStore();
const login = async () => {
  await store.dispatch('auth/login');
  console.log(store.state.auth.user);
};
</script>

<template>
  <div class="h-screen d-flex align-center justify-center login" style="">
    <v-card
      width="50vh"
      height="auto"
      class="text-center pa-5"
      :style="{ boxShadow: '0 0 1rem rgb(197, 214, 45)' }"
    >
      <v-card-title class="text-center" style="text-shadow: 0 0 0 1rem rgb(197, 214, 45)"
        >Login
      </v-card-title>
      <v-card-subtitle class="font-weight-bold pb-3">With</v-card-subtitle>
      <v-hover>
        <v-tooltip text="Google" location="start">
          <template v-slot:activator="{ isActive, props }">
            <v-btn
              v-bind="props"
              class="text-capitalize mx-2"
              @click="login"
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
            @click="login"
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
  background-image: url(../assets/marek-piwnicki-MlRbhx_1Vy0-unsplash.jpg);
  background-size: cover;
}

.v-card {
  background: #00000005;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(15px);
}
</style>

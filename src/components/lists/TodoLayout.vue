<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import jwtDecode from 'jwt-decode';
import SnackbarLayout from '../SnackbarLayout.vue';
import router from '@/router';

const store = useStore();
const data = ref({
  text: '',
  textDecoration: '',
  textShadow: '0 0 1rem #0fe',
  selesai: false,
});
const snackbar = ref({
  message: '',
  timeout: '',
  active: false,
});

onMounted(async () => {
  await store.dispatch('service/getLists');
  if (JSON.parse(localStorage.getItem('accessToken'))) {
    const { user_id: id } = jwtDecode(JSON.parse(localStorage.getItem('accessToken')));
    await store.dispatch('user/getUser', id);

    if (store.state.user.user) {
      snackbar.value = {
        ...snackbar.value,
        message: 'Hallo... ' + store.state.user.user.name + '👋',
        active: true,
      };
      setTimeout(() => {
        snackbar.value = {
          ...snackbar.value,
          active: false,
        };
      }, 5000);
    }
  }
  if (user.value) {
    window.addEventListener('beforeunload', async () => {
      await store.dispatch('auth/logout', user.value.id);
    });
  }
});
const lists = computed(() => store.state.service.lists);
const user = computed(() => store.state.user.user);

const add = () => {
  store.dispatch('service/addList', { ...data.value });
  store.dispatch('service/getLists');
  data.value.text = '';
};

const hapus = async (id) => {
  await store.dispatch('service/removeList', id);
  await store.dispatch('service/getLists');
};
const selesai = async (id) => {
  await store.dispatch('service/updateList', id);
  await store.dispatch('service/getLists');
};

const logout = async (id) => {
  await store.dispatch('auth/logout', id);
  router.push({ name: 'Login' });
};
</script>

<template>
  <div>
    <v-row>
      <v-col>
        <h1 class="text-center text-white" style="text-shadow: 0 0 1rem #0fe">My To Do List's</h1>
      </v-col>
    </v-row>
    <v-row v-if="user">
      <v-col cols="auto" md="auto" sm="auto" class="ps-5 pe-0">
        <v-avatar>
          <v-img :src="user.image" :alt="user.name"></v-img>
        </v-avatar>
      </v-col>
      <v-col align-self="center">
        <h4 class="text-start text-white">{{ user.name }}</h4>
      </v-col>
      <v-col cols="auto" align-self="center" class="ms-md-auto">
        <v-btn color="error" @click="logout(user.id)" variant="outlined" class="text-capitalize"
          >logout</v-btn
        >
      </v-col>
    </v-row>
    <v-row justify="center" class="mx-0">
      <v-col>
        <v-text-field
          variant="solo"
          v-model="data.text"
          color="success"
          label="Type here"
          @keyup.enter="add"
        >
        </v-text-field>
      </v-col>
      <v-col cols="auto" md="auto" sm="auto" class="text-center">
        <v-btn @click="add()" icon="mdi-plus" color="success"> </v-btn>
      </v-col>
    </v-row>

    <div class="overflow-y-auto overflow-x-hidden ms-0" style="height: 75vh">
      <v-row justify="center" class="mt-5 ms-0" v-for="(item, index) in lists" :key="index">
        <v-col cols="1" class="px-0 d-flex align-center">
          <span
            class="pe-10 text-white"
            :style="{ textShadow: item.textShadow }"
            v-if="item.selesai"
            >✔
          </span>
          <span class="pe-10" :style="{ textShadow: item.textShadow }" v-else>✨ </span>
        </v-col>
        <v-col cols="6" class="px-0 d-flex align-center">
          <h3
            class="text-capitalize text-white"
            :class="item.textDecoration"
            :style="{ textShadow: item.textShadow }"
          >
            {{ item.text }}
          </h3>
        </v-col>

        <v-col cols="2" md="1" class="d-flex align-center px-0">
          <v-tooltip :text="item.selesai ? 'Uncompleted' : 'Completed'" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                v-if="item.selesai"
                v-bind="props"
                color="success"
                variant="text"
                @click="selesai(item.id)"
                class="text-h5"
              >
                👍
              </v-btn>
              <v-btn
                v-if="!item.selesai"
                v-bind="props"
                color="success"
                variant="text"
                @click="selesai(item.id)"
                class="text-h5"
              >
                👎
              </v-btn>
            </template>
          </v-tooltip>
        </v-col>
        <v-col cols="1" class="px-0 d-flex align-center">
          <v-tooltip text="Remove" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-close"
                color="error"
                variant="text"
                @click="hapus(item.id)"
              ></v-btn>
            </template>
          </v-tooltip>
        </v-col>
        <v-divider class="px-2" color="white" inset></v-divider>
      </v-row>

      <SnackbarLayout :message="snackbar.message" :snackbar="snackbar.active" />
    </div>
  </div>
</template>

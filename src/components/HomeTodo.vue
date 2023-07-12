<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const data = ref({
  text: '',
  textDecoration: '',
  textShadow: '0 0 1rem #0fe',
  selesai: false,
});

onMounted(() => {
  store.dispatch('service/getLists');
});
const lists = computed(() => store.state.service.lists);
console.log(lists.value);

const add = () => {
  store.dispatch('service/addList', { ...data.value });
  store.dispatch('service/getLists');
};

const hapus = async (id) => {
  store.dispatch('service/removeList', id);
  store.dispatch('service/getLists');
};
const selesai = (index) => {
  console.log(index);
  // lists.value[index].selesai = !lists.value[index].selesai;
  // if (lists.value[index].selesai) {
  //   lists.value[index].textDecoration = 'text-decoration-line-through text-red text-disabled';
  //   lists.value[index].textShadow = '0 0 1rem red';
  // } else {
  //   lists.value[index].textDecoration = '';
  //   lists.value[index].textShadow = '0 0 1rem #0fe';
  // }
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-center" style="text-shadow: 0 0 1rem #0fe">My To Do List's</h1>
      </v-col>
    </v-row>
    <v-row justify="center" class="mx-0">
      <v-col cols="9" md="11" sm="10">
        <v-text-field
          variant="solo"
          v-model="data.text"
          color="success"
          label="Type here"
          @keyup.enter="add"
        >
        </v-text-field>
      </v-col>
      <v-col cols="3" md="1" sm="2" class="text-center">
        <v-btn @click="add()" icon="mdi-plus" color="success"> </v-btn>
      </v-col>
    </v-row>

    <div class="overflow-y-auto" style="height: 75vh">
      <v-row
        justify="center"
        class="justify-center mt-5"
        v-for="(item, index) in lists"
        :key="index"
      >
        <v-col cols="1" class="px-0 d-flex align-center">
          <span class="pe-10" :style="{ textShadow: item.textShadow }" v-if="item.selesai">✔ </span>
          <span class="pe-10" :style="{ textShadow: item.textShadow }" v-else>✨ </span>
        </v-col>
        <v-col cols="6" class="px-0 d-flex align-center">
          <h3
            class="text-capitalize text-justify"
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
                @click="selesai(index)"
                class="text-h5"
              >
                👍
              </v-btn>
              <v-btn
                v-if="!item.selesai"
                v-bind="props"
                color="success"
                variant="text"
                @click="selesai(index)"
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
        <v-divider inset></v-divider>
      </v-row>
    </div>
  </v-container>
</template>

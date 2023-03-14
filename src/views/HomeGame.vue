<script setup lang="ts">
import {ref} from "vue";
import RegleGame from "@/components/RegleGame.vue"
import {useUserStore} from "@/stores/UserStore";

const userStore = useUserStore()

const modalHelp = ref<boolean>(false)

</script>

<template>
  <div class="w-full h-full relative">
    <div class="bg-slate-900 w-11/12 m-auto p-4 rounded-md relative">
      <h3 class="block w-full lg:w-1/3 m-auto pt-6 text-white text-center font-bold">Veuillez choisir une difficulté :</h3>
      <select
          v-model="userStore.difficulty"
          class="bg-slate-600 text-white border p-3 rounded-md border-emerald-900 m-auto block my-2 w-full lg:w-2/3 text-center"
      >
        <option value="Novice">Novice</option>
        <option value="Normal">Normal</option>
        <option value="Expert">Expert</option>
        <option value="Extreme">Extreme</option>
      </select>
      <div class="cursor-pointer absolute top-1 right-1 m-1 text-white font-bold"
           @click="modalHelp = true">
        ?
      </div>
      <router-link to="/simon-game-play" class="block p-3 bg-emerald-700 bg-emerald-900 hover:bg-emerald-600 hover:bg-emerald-800 cursor-pointer transition duration-300 text-white w-full lg:w-2/3 m-auto rounded-md text-center">Go !</router-link>
    </div>
    <template v-if="modalHelp">
      <RegleGame @go-close="modalHelp = false" />
    </template>
  </div>

</template>
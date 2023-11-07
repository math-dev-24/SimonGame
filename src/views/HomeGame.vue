<script setup lang="ts">
import {ref} from "vue";
import RegleGame from "@/components/RegleGame.vue"
import {useUserStore} from "@/stores/UserStore";

const userStore = useUserStore()

const modalHelp = ref<boolean>(false)

const modes : string[] =  ['Novice', "Normal", "Expert", "Extreme"]

</script>

<template>
  <div class="w-full h-full relative">
    <div class="bg-slate-900 w-11/12 m-auto px-4 py-16 rounded-md relative">
      <h3 class="block w-full lg:w-1/3 m-auto pt-6 text-white text-center font-bold">Veuillez choisir une difficulté :</h3>
      <select
          v-model="userStore.difficulty"
          class="bg-slate-600 text-white border p-3 rounded-md border-emerald-900 m-auto block my-2 w-full lg:w-2/3 text-center"
      >
        <option v-for="(mode, index) in modes" :key="index" :value="mode">{{mode}}</option>
      </select>
      <div class="cursor-pointer absolute top-4 right-4 m-1 text-white font-bold hover:text-emerald-600 transition duration-500"
           @click="modalHelp = true">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="currentColor" d="M11.95 18q.525 0 .888-.363t.362-.887q0-.525-.362-.888t-.888-.362q-.525 0-.887.363t-.363.887q0 .525.363.888t.887.362Zm-.9-3.85h1.85q0-.825.188-1.3t1.062-1.3q.65-.65 1.025-1.238T15.55 8.9q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.313.75T8.55 8.55l1.65.65q.125-.45.563-.975T12.1 7.7q.8 0 1.2.438t.4.962q0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"/></svg>
      </div>
      <router-link to="/simon-game-play" class="block p-3 bg-emerald-700 hover:bg-emerald-600 cursor-pointer transition duration-300 text-white w-full lg:w-2/3 m-auto rounded-md text-center">Go !</router-link>
    </div>
    <template v-if="modalHelp">
      <RegleGame @go-close="modalHelp = false" />
    </template>
  </div>

</template>
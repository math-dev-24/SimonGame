<script setup lang="ts">
import {useUserStore} from "@/stores/UserStore";

const userStore = useUserStore()


</script>

<template>
  <h3 class="block w-1/3 m-auto pt-6">Veuillez choisir une difficulté :</h3>
  <select
      v-model="userStore.difficulty"
      class="bg-gray-50 border p-3 rounded-md border-emerald-900 m-auto block my-2 w-1/3"
    >
    <option>Novice</option>
    <option>Normal</option>
    <option>Expert</option>
    <option>Extreme</option>
  </select>
  <router-link to="/simon-game-play" class="block p-3 bg-emerald-700 hover:bg-emerald-600 cursor-pointer transition duration-300 text-white w-1/3 m-auto rounded-md text-center">Go !</router-link>
</template>
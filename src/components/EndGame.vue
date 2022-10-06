<script setup lang="ts">

const props = defineProps<{
  score: number
}>()

const emit = defineEmits<{
  (e: 'goRestart'):void
  (e: 'goChangeDifficulty'):void
}>()

</script>


<template>
  <Teleport to="body">
    <div class="bg-slate-200 opacity-40 fixed z-10 top-0 left-0 w-full h-full hidden sm:block"></div>
    <div class="
          fixed z-30 w-full h-full
          sm:w-1/2 sm:h-1/2 sm:top-1/4 sm:left-1/4
          border border-emerald-900 p-4 bg-slate-600 dark:bg-slate-700 rounded-md text-white flex flex-col items-center content-center
        ">
      <h4 class="font-bold text-3xl h-1/3">Perdu ! Bouhhh ..</h4>
      <div class="h-1/3 font-bold text-2xl">
        Votre score est de {{props.score}}
      </div>
      <div class="flex content-center items-center w-full h-1/3">
        <div
            class="p-2 cursor-pointer text-center m-1 bg-amber-400 dark:bg-amber-800 dark:hover:bg-amber-700 hover:bg-amber-300 transition duration-300 rounded-md m-auto w-1/2"
            @click="emit('goRestart')"
        >
          Rejouer avec la même difficulté
        </div>
        <div
            class="p-2 cursor-pointer text-center m-1 dark:bg-emerald-800 dark:hover:bg-emerald-700 bg-emerald-400 hover:bg-emerald-300 transition duration-300 rounded-md m-auto w-1/2"
            @click="emit('goChangeDifficulty')"
        >
          Changer de difficulté
        </div>
      </div>
    </div>
  </Teleport>
</template>
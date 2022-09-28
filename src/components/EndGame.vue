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
    <div class="bg-slate-200 opacity-40 fixed z-10 top-0 left-0 w-full h-full"></div>
    <div class="fixed w-1/2 h-1/2 z-30 top-1/4 left-1/4 border border-emerald-900 p-4 bg-amber-100 rounded-md text-white">
      <h4 class="font-bold text-3xl">Perdu !</h4>
      <div>
        Votre score est de {{props.score}}
      </div>
      <div class="flex content-between items-center w-full">
        <div
            class="border p-2 cursor-pointer text-center m-1 bg-amber-400 hover:bg-amber-300 transition duration-300 rounded-md m-auto w-1/4"
            @click="emit('goRestart')"
        >
          Rejouer avec la même difficulté
        </div>
        <div
            class="border p-2 cursor-pointer text-center m-1 bg-emerald-400 hover:bg-emerald-300 transition duration-300 rounded-md m-auto w-1/4"
            @click="emit('goChangeDifficulty')"
        >
          Changer de difficulté
        </div>
      </div>
    </div>
  </Teleport>
</template>
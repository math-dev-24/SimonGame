<script setup lang="ts">

const emit = defineEmits<{
  (e: "goClose"):void
}>()

</script>


<template>
  <Teleport to="body">
    <div class="fixed z-30 top-0 left-0 w-full h-full md:w-2/4 md:h-3/4 md:top-16 md:left-1/4
                flex content-around flex-col p-4
                md:rounded-md text-white
                bg-slate-800 md:bg-slate-700"
    >
      <h1 class="h-1/5 font-bold text-2xl text-center underline uppercase">Régle du jeu :</h1>
      <div class="h-3/5">
        <div class="text-xl font-semibold text-center">
          Une série d'instruction va être présentée. il faudrat la ré-excuter dans le bon Ordre !
        </div>
        <div class="my-5 ml-2">
          <h3 class="font-bold underline">Différents modes :</h3>
          <ul>
            <li class="m-1"><b>Novice :</b> Jeu en mode découverte. Vous avez droit à 9 vies. Et l'aide si besoin.</li>
            <li class="m-1"><b>Normal :</b> Vous avez le droit à 5 vies. Et de l'aide si besoin.</li>
            <li class="m-1"><b>Expert :</b> Vous avez le droit à 3 vies. Pas d'aide</li>
            <li class="m-1"><b>Extrème :</b> Vitesse augmenté et 0 vie.</li>
          </ul>
        </div>
      </div>
      <div class="h-1/5 flex content-center items-center">
        <div
            @click="emit('goClose')"
            class=" cursor-pointer p-2 bg-emerald-900 hover:bg-emerald-800 transition duration-300 text-white w-1/2 m-auto rounded-md text-center font-bold"
        >
          D'accord !
        </div>
      </div>
    </div>
    <div @click="emit('goClose')" class="fixed top-0 left-0 w-full h-full bg-slate-400 opacity-60">

    </div>
  </Teleport>
</template>